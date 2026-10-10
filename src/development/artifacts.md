# Artifacts

Artifacts are the outputs of TeamSBC's image builds. The main output is a compressed raw disk image for a particular variant, device type, and architecture. Makalu builds also export components used for image-based updates, and definitions produce system extensions as well.

The [artifacts repository](https://github.com/teamsbc/artifacts) contains the definitions and workflows that produce these files. The [build system](./build-system.md) chapter explains how those definitions fit together and how to build an image locally.

## Types of Artifact

| Output | Purpose | Publication location |
| --- | --- | --- |
| Disk image (`.raw.xz`) | Initial installation on a device or in a virtual machine | [artifacts.teamsbc.net](https://artifacts.teamsbc.net/index.html) |
| Makalu `/usr` image (`.usr.raw.xz`) | Versioned operating system partition for updates | [updates.teamsbc.net](https://updates.teamsbc.net/index.html) |
| Makalu UKI (`.efi`) | Unified Kernel Image paired with the operating system version | [updates.teamsbc.net](https://updates.teamsbc.net/index.html) |
| System extension (`.sysext.erofs`) | Additional software built alongside a matching base image | [extensions.teamsbc.net](https://extensions.teamsbc.net/index.html) |

A UKI is the bootable file containing the kernel, initial RAM filesystem, and related boot information. For Makalu, the UKI and `/usr` payload belong to the same image version and need to remain consistent with the update configuration shipped in `teamsbc-config`.

The current `makalu-virt` definition includes an experimental `tmux` system extension. System extensions are additional build outputs where configured; they are not produced for every image type.

## Structure

Disk images are organized by branch, Fedora version, architecture, and image type. For example:

```text
artifacts.teamsbc.net/
  main/
    46/
      x86_64/
        teamsbc-lhotse-virt/
        teamsbc-makalu-virt/
      aarch64/
        teamsbc-lhotse-virt/
        teamsbc-lhotse-rpi4/
        teamsbc-lhotse-rpi5/
        teamsbc-makalu-rpi4/
```

Update payloads and extensions use the same grouping on their respective publication domains. Unlike the [package repositories](./packages.md#repository-layout-and-signing), these outputs use versioned filenames within an image-type directory rather than `latest/` and dated snapshot directories.

## Image Identity and Version

`IMAGE_ID` identifies the image type, such as `teamsbc-makalu-virt`. `IMAGE_VERSION` identifies a build. CI constructs the version from the Fedora major version and the build date in the form `<major>.<YYYYMMDD>.0`.

For an example version of `46.20261010.0`, related Makalu outputs would be named:

```text
teamsbc-makalu-virt-46.20261010.0.raw.xz
teamsbc-makalu-virt-46.20261010.0.usr.raw.xz
teamsbc-makalu-virt-46.20261010.0.efi
teamsbc-makalu-virt-46.20261010.0.tmux.sysext.erofs
```

These are naming examples, not a promise that a particular build is available. When changing identity or version handling, keep the disk labels, boot entry names, exported filenames, extension compatibility information, and update match patterns aligned.

## Metadata and Checksums

Build manifests are published in a `meta/` directory beside the outputs. CI copies the image build's metadata alongside its update payloads and any exported extensions so those files can be traced back to the build that produced them.

The build workflow generates per-file `.sha256` sidecars. A separate index workflow uses those sidecars to assemble `SHA256SUMS` files, signs the aggregate checksum files with the TeamSBC key, and uploads the checksums, signatures, and directory indexes.

When investigating a build or reporting a problem, record its full filename and keep the corresponding metadata available. A Fedora major version alone does not distinguish builds made on different days.

## Downloading Artifacts

You can find download links for all supported devices on the [installation](../getting-started/installation.md#supported-devices) page or browse the [artifacts storage](https://artifacts.teamsbc.net/index.html) directly.

## Building Artifacts

The [artifact build workflow](https://github.com/teamsbc/artifacts/blob/main/.github/workflows/build.yml) defines the combinations built by CI. Its current Fedora 46 matrix includes Lhotse virtual machines on both architectures, Lhotse Raspberry Pi 4 and 5 images on `aarch64`, Makalu virtual machines on `x86_64`, and Makalu Raspberry Pi 4 images on `aarch64`.

A definition can describe more combinations than CI currently builds. Use the workflow matrix to determine what is configured for publication, and the installation chapter for the download links intended for getting started. To build or modify an image yourself, continue to the [build system](./build-system.md) chapter.
