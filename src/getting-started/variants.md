# Variants

TeamSBC variants offer different approaches to maintaining devices. They share the project's overall design goals, but differ in how you make changes to the installed system. Choosing a variant is therefore also choosing how you want to manage it after installation.

The handbook separates maintenance instructions for **Makalu** and **Lhotse**. Read the documentation for your chosen variant when updating a system or adding applications, since those procedures are not interchangeable.

## At a Glance

| | Lhotse | Makalu |
| --- | --- | --- |
| System management | Package-based | Cohesive |
| Approach to changes | Install, remove, and update individual packages | Designed around replacing a versioned system image |
| Package tooling | Uses `dnf` | Uses `updatectl` |
| Maintenance documentation | Covers updates, applications, users, and networking | Still being written |

Image availability also depends on the device and architecture. The [supported devices list](./installation.md#supported-devices) identifies the images linked by this handbook; do not assume that every device has images for both variants.

## Makalu

Makalu is the cohesive variant. Its intended maintenance model treats the operating system as a versioned whole, with system updates replacing the system image rather than updating individual packages in place.

That model changes how you think about modifying and maintaining a device. Decisions about what belongs in the operating system image become part of preparing that image, and you should not carry over Lhotse's `dnf` procedures without checking the Makalu documentation.

Makalu's maintenance procedures are still being documented. The update and application chapters are incomplete, so treat the cohesive model described here as a work in progress.

See [updating Makalu](../maintenance/makalu/updating.md) and [installing applications on Makalu](../maintenance/makalu/installing-applications.md).

## Lhotse

Lhotse is the package-based variant. If you have used Fedora or another distribution where you install and update packages on the running system, this approach will probably feel familiar.

You use `dnf` to manage software, and changes are made to the individual installation. This makes Lhotse a useful starting point if you want to explore TeamSBC through familiar package-management tasks and follow the maintenance instructions already available in the handbook.

See [updating Lhotse](../maintenance/lhotse/updating.md) and [installing applications on Lhotse](../maintenance/lhotse/installing-applications.md).

## Choosing a Variant

If you want to get started with the installation and maintenance procedures currently documented here, Lhotse is the straightforward starting point. If you are interested in exploring or contributing to the cohesive approach, read the Makalu chapters and [talk with the community](../preface/community.md) about the work in progress.

Once you have chosen a variant, continue to [installation](./installation.md) to find an image for your device and prepare it for booting.
