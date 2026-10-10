# Build System

TeamSBC uses [image-builder](https://osbuild.org/docs/developer-guide/projects/image-builder/) to produce disk images from Fedora and TeamSBC packages. The [artifacts repository](https://github.com/teamsbc/artifacts) contains the image definitions, repository configuration, local build helpers, and GitHub Actions workflows.

An image build combines the chosen variant and device definition with shared package sets, a platform configuration, and a disk layout. Understanding those inputs helps you put a change in the right place and see which images it affects.

## Definition Layout

| Path in the artifacts repository | Purpose |
| --- | --- |
| `data/defs/teamsbc.yaml` | Distribution-wide settings and image configuration |
| `data/defs/teamsbc/` | Virtual machine and board-specific image types |
| `data/defs/library/packages.yaml` | Shared package selections for core, variant, hardware, and Wi-Fi functionality |
| `data/defs/library/platforms.yaml` | Architecture, bootloader, firmware, and boot-file configuration |
| `data/defs/library/disk/` | Partition definitions and disk layouts |
| `data/defs/library/defaults/` | Shared image defaults |
| `data/defs/library/sysexts.yaml` | System extension definitions |
| `data/repo/` | Package repositories used while building |

Definitions reuse configuration through image-builder's experimental YAML extensions, including `!xref` references to other files. A generic YAML parser does not resolve these references or establish whether the resulting image definition is usable. Use image-builder to interpret the definitions.

As an example, `lhotse-rpi4` combines shared core and Lhotse packages with hardware and Wi-Fi packages, the Raspberry Pi 4 platform, and the Raspberry Pi disk layout. A core package-set change can affect several image types, whereas a change in the board-specific definition can be limited to that board.

## Building Locally

Run the provided Makefile from the root of your artifacts checkout. The container route requires Podman, `make`, and permission to run the privileged build container through `sudo`. It also needs access to the container registry and package repositories, along with space for the build outputs.

TeamSBC uses recent image-builder features that may not yet be present in a packaged release. The upstream container is the usual starting point:

```console
$ make build-in-container VERSION=46 TYPE=lhotse-virt
```

This example builds the Fedora 46 Lhotse virtual machine image. The helper mounts the checkout's definitions and repositories into the container and writes outputs into the working directory. It does not upload or publish them.

The Makefile exposes these build variables:

| Variable | Meaning | Current default |
| --- | --- | --- |
| `VERSION` | Fedora major version and TeamSBC distro selection | `46` |
| `TYPE` | Image type to build | `makalu-virt` |
| `IMAGE_VERSION` | Build identity used by versioned outputs | `<VERSION>.<YYYYMMDD>.0` |

Specify the version and type explicitly so you know which image you are requesting. The examples in this chapter assume a host architecture supported by the chosen image type. CI uses architecture-specific runners; the local Makefile does not provide an `ARCH` variable for selecting a different target.

To use a locally installed image-builder instead, run:

```console
$ make build VERSION=46 TYPE=lhotse-virt
```

The `build` target invokes `image-builder` from the host's command search path through `sudo`, with the checkout's repository and definition paths. Installing a packaged image-builder is an option, but its version must understand the experimental features used by these definitions.

## Inspecting a Manifest

A manifest describes the build pipelines and the sources they fetch. It is useful when investigating package selection, repository inputs, or changes that affect more than one image type.

The container helper can generate one without building the disk image:

```console
$ make manifest-in-container VERSION=46 TYPE=lhotse-virt
```

The current `manifest-in-container` target explicitly selects `aarch64`. Keep that in mind when comparing its output with a build on an `x86_64` host. For another architecture, adapt the image-builder invocation from the [artifact workflow](https://github.com/teamsbc/artifacts/blob/main/.github/workflows/build.yml), which shows the manifest command with an explicit architecture.

## Makalu Outputs and CI Differences

Makalu definitions export the `/usr` partition and UKI as additional outputs. The `makalu-virt` definition also includes a system extension. Those outputs require image-builder's `--with-extra '*'` option.

The local `build` target requests extras for Makalu, and CI does the same. The current `build-in-container` target does not pass that option, so it does not reproduce the complete Makalu publication build. If you need the additional outputs, adapt the container invocation from the workflow and include that option. CI also uses `--with-manifest` to retain build metadata.

CI renames outputs, separates images from updates and extensions, generates checksum sidecars, and uploads the results. These are publication steps after the image build, so local output names and directory layout can differ from the files on the public download domains. See [artifacts](./artifacts.md) for the published naming scheme.

## Making Changes

Start with the smallest change to definitions necessary for the behavior you want to change. Package selection belongs in package sets; board boot files belong in platform definitions; persistent configuration delivered by an RPM belongs in the [packages repository](./packages.md).

For Makalu, keep image identity and version handling consistent across the disk layout, boot configuration, update payloads, and extensions. A successful build is the start of things: boot the result and try the behavior you changed as described in [testing](./testing.md).
