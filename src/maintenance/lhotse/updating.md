# Updating on Lhotse {#updating}

> [!NOTE]
> This section applies to the [Lhotse](/getting-started/variants.md#lhotse) variant.
> For the other variant, see [Updating on Makalu](/maintenance/makalu/updating.md).

Keeping your system up to date is important for security and stability. TeamSBC uses `dnf` for package management.

## Checking for updates

```console
$ dnf check-update
```

## Updating the system

```console
$ dnf upgrade
```

## Rebooting after updates

Some updates require a reboot to take effect, most notably kernel and `systemd` updates. You can check if a reboot is needed with:

```console
$ needs-restarting -r
```

## Automatic updates

If you want your system to apply updates automatically you can enable `dnf-automatic`.

```console
$ dnf install dnf-automatic
$ systemctl enable --now dnf-automatic-install.timer
```
