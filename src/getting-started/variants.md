# Variants

TeamSBC variants describe approaches to maintaining devices. Each variant has its own maintenance instructions and image types.

## Makalu

Makalu is currently the TeamSBC variant. Its cohesive maintenance model treats the operating system as a versioned whole, with system updates replacing the system image rather than updating individual packages in place. Separate applications can be layered on top and update together with the system image.

Decisions about what belongs in the operating system image are part of preparing that image. See [updating Makalu](../maintenance/makalu/updating.md) and [applications on Makalu](../maintenance/makalu/applications.md); these chapters are still being documented.

Image availability depends on the device and architecture. Continue to [installation](./installation.md) to find an image and prepare it for booting.
