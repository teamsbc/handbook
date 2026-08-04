# Updating

> [!NOTE]
> This section applies to the [Lhotse](../getting-started/variants.md#lhotse) variant.

Keeping your system up to date is important for security and stability. TeamSBC uses `dnf` for package management.

## Checking for updates

```console
$ dnf check-update
```

## Updating the system

```console
$ run0 dnf upgrade
```

## Rebooting after updates

Some updates require a reboot to take effect, most notably kernel and `systemd` updates. You can check if a reboot is needed with:

```console
$ needs-restarting -r
```

## Automatic updates

If you want your system to apply updates automatically you can enable `dnf-automatic`.

```console
$ run0 dnf install dnf-automatic
$ run0 systemctl enable --now dnf-automatic-install.timer
```
