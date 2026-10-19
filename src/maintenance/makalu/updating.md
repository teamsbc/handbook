# Updating on Makalu

> [!IMPORTANT]
> Instructions for system updates on Makalu have not been documented yet.

For the other variant, see [Updating on Lhotse](/maintenance/lhotse/updating.md).

## Checking for updates

```console
# updatectl check
TARGET UPDATE                       
host   46.20261003.0 → 46.20261010.0
```

## Updating the system

```console
# updatectl update
host@46.20261010.0: ✓ Done
```

## Rebooting after updates

You should always reboot after updates for updates to take effect

```console
# systemctl reboot
```

## Automatic Updates

If you want your system to apply updates automatically you can enable the `systemd-sysupdate.timer`.

```console
# systemctl enable systemd-sysupdate.timer
```
