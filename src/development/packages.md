# Packages

TeamSBC uses Fedora packages as its foundation and layers its own RPM packages on top. These packages supply the distribution's identity, configuration, SELinux policy, and board-specific firmware. Changing one of these areas usually starts in the [packages repository](https://github.com/teamsbc/packages), while deciding which packages an image includes belongs in the [artifacts repository](https://github.com/teamsbc/artifacts).

Each package has a directory containing its RPM spec and any local sources, configuration files, or patches. The spec describes the build requirements, installation steps, package contents, and scriptlets that run when the package is installed or removed.

## Common Packages

The `common/` directory contains the packages that define the shared system and its variant-specific defaults:

| Package | Responsibility |
| --- | --- |
| `teamsbc-release` | Operating system identity, service presets, and kernel-install configuration |
| `teamsbc-repos` | TeamSBC package repository definitions and the RPM signing public key |
| `teamsbc-config` | Disk provisioning configuration and Makalu's update transfers and import keyring |
| `teamsbc-selinux` | SELinux policy adjustments for TeamSBC's services and workflows |

Some specs produce several subpackages. For example, `teamsbc-release` and `teamsbc-config` separate common files from Lhotse and Makalu configuration. When changing a file, look at the relevant `%files` section and dependencies to understand which installations receive it.

Boot configuration spans packages and image definitions. A change to Makalu's boot entry naming, for example, can also affect the UKI exported by an image build and the filename patterns used by `systemd-sysupdate`. Read the [build system](./build-system.md) chapter when working on changes that cross between them.

## Firmware Packages

The `firmware/` directory contains board-specific firmware packages. The `teamsbc-uboot` spec builds U-Boot with TeamSBC's configuration and patches, and produces subpackages for Raspberry Pi 4 and Raspberry Pi 5. It also includes a Raspberry Pi 4 LetsTrust TPM overlay subpackage.

The firmware spec is restricted to `aarch64`. Image platform definitions select the appropriate board package and copy the boot files into the disk image, so adding or changing firmware may also require changes in the artifacts repository.

## Building and Publishing

The [package build workflow](https://github.com/teamsbc/packages/blob/main/.github/workflows/build.yml) builds the `common` and `firmware` repositories for Fedora 46 on `x86_64` and `aarch64`, subject to each spec's architecture restrictions. It runs for relevant changes pushed to `main` and can also be started manually.

On a push, the workflow selects packages whose source directories have changed since the commit recorded in the published repository metadata. Each architecture and repository has its own baseline. Changes to shared build inputs (workflows) cause full rebuilds, and a manual run requests a full rebuild as well. Missing or unrecognized baselines also fall back to rebuilding all packages.

The build steps install requirements from the specs, prepare local and downloaded sources, and run `rpmbuild`. Built RPMs are signed, then new repository metadata is merged with the existing metadata. Unchanged RPMs remain in storage. The workflow uploads RPMs and supporting metadata before publishing `repomd.xml`, which records the source commit for subsequent builds.

After successful build jobs, the workflow copies a complete dated snapshot from `latest/`, keeps the five most recent dated snapshots, and regenerates directory indexes. Publication is serialized per branch so these operations happen in sequence.

## Repository Layout and Signing

Published packages can be browsed on [packages.teamsbc.net](https://packages.teamsbc.net/index.html). Repository paths follow this pattern:

```text
<branch>/latest/<Fedora version>/<architecture>/<repository>/
<branch>/<YYYY.MM.DD>/<Fedora version>/<architecture>/<repository>/
```

For example, `main/latest/46/aarch64/common/` contains the current common repository for that architecture and Fedora version. The `teamsbc-repos` package configures these repositories on installed systems.

RPMs are signed with the TeamSBC GPG key. Its public key is installed at `/etc/pki/rpm-gpg/RPM-GPG-KEY-teamsbc` by `teamsbc-repos` and is also published with the package repositories. Package signature verification and repository metadata signing are separate: the current repository configuration enables RPM signature checking but does not enable metadata signature checking.

## Working on a Package

Start with the spec and sources for the package that owns the behavior you want to change. Review its expanded spec, dependencies, file ownership, and scriptlets before building. The CI workflow shows the source preparation and build steps to reproduce locally in a matching Fedora environment.

For configuration changes, test both a fresh installation and an upgrade where existing configuration matters. A successful RPM build does not establish that a service can use the installed files or that SELinux permits the intended operation. See [testing](./testing.md) for guidance on checking those behaviors and running the repository helper tests.
