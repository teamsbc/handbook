# Installing Applications on Makalu

For the other variant, see [Installing Applications on Lhotse](/maintenance/lhotse/installing-applications.md).

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

Makalu provides optional applications as system extensions: images containing
additional files that are made available in the running system's `/usr` directory.
TeamSBC exposes these extensions as optional features managed by `updatectl`.
The examples below use the `tmux` terminal multiplexer; use the feature list to
see which extensions your system offers.

An extension can be **enabled** for updates, **downloaded** onto the device, and
**active** in the running system. Enabling a feature controls whether its extension
is downloaded during updates. Activating (or "merging") a downloaded extension
makes its applications available to use.

## Listing available features

List the optional features defined for your system:

```console
$ updatectl features
  FEATURE DESCRIPTION
✗ tmux[🡕] tmux terminal multiplexer
```

A check mark (`✓`) means the feature is enabled; a cross (`✗`) means it is
disabled. These symbols do not tell you whether the extension is downloaded or
active. To see more information about a feature, use `updatectl features tmux`.

## Installing a system extension

If you have already installed an OS update that is waiting for a reboot,
[reboot into it first](./updating.md#rebooting-after-updates). Otherwise,
`updatectl enable --now` may download the extension for the pending OS version
rather than the version you are currently running.

Enable the feature and download its extension immediately:

```console
$ run0 updatectl enable tmux --now
host@46.20261014.0: ✓ Done
Feature(s) downloaded.
```

Without `--now`, enabling a feature only changes the configuration; its extension
is downloaded during the next OS update.

Activate the downloaded extension in the running system:

```console
$ run0 systemd-sysext refresh
Using extensions 'tmux_46.20261014.0.sysext.raw'.
Merged extensions into '/usr'.
```

`refresh` updates the active set of extensions, including any that were already
merged. You can now run `tmux` as your normal user, without rebooting.

To activate installed extensions automatically on subsequent boots, enable the
system extension service once:

```console
$ run0 systemctl enable systemd-sysext.service
```

## Checking downloaded and active extensions

List extension images present on the device:

```console
$ systemd-sysext list
```

Check which extensions are currently merged into the running system:

```console
$ systemd-sysext status
```

Use these commands alongside `updatectl features`: an enabled feature alone does
not mean its application is ready to use.

## Removing a system extension

Exit any running `tmux` sessions, then disable the feature and request immediate
cleanup of its downloaded images:

```console
$ run0 updatectl disable tmux --now
```

TeamSBC's current extension configuration protects the image matching the running
OS version from automatic cleanup. This can leave that image installed even after
`disable --now`. Remove any remaining `tmux` extension images, then refresh to
remove their files from the running system:

```console
$ run0 rm -f -- /var/lib/extensions/tmux_*.sysext.raw
$ run0 systemd-sysext refresh
No extensions found.
Unmerged '/usr'.
```

The example output assumes `tmux` was the only extension. Other installed
extensions remain available after the refresh. The disabled `tmux` feature will
no longer be downloaded during OS updates.

## Updating system extensions

Enabled features are updated alongside the OS, using extension images built for
the same version. Follow [Updating on Makalu](./updating.md) to install OS updates
and reboot into the new version. With `systemd-sysext.service` enabled, compatible
installed extensions are activated during boot.

See [updatectl(1)](https://www.freedesktop.org/software/systemd/man/latest/updatectl.html)
for feature management and
[systemd-sysext(8)](https://www.freedesktop.org/software/systemd/man/latest/systemd-sysext.html)
for listing and activating extensions.
