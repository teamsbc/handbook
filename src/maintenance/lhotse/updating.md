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

Some updates require a reboot to take effect, most notably kernel and `systemd` updates. Check whether a reboot is recommended with:

```console
$ dnf needs-restarting
```

This command is provided by `dnf5-plugins`. If it is not installed, install it with `dnf install dnf5-plugins`. The command reports whether a reboot is recommended; reboot the system to apply updates when needed.

## Automatic updates

To download and install updates automatically, install the DNF5 automatic update plugin:

```console
$ dnf install dnf5-plugin-automatic
```

In `/etc/dnf/automatic.conf`, set `apply_updates` in the `[commands]` section to `yes`. Add the section or setting if it is missing:

```ini
[commands]
apply_updates = yes
```

Then enable and start the timer:

```console
$ systemctl enable --now dnf5-automatic.timer
```

The timer runs according to its schedule; starting it does not necessarily install updates immediately. Automatic updates do not reboot the system by default. Check whether a reboot is recommended as described above, and reboot when needed.

See the [DNF5 automatic update documentation](https://dnf5.readthedocs.io/en/stable/dnf5_plugins/automatic.8.html) for configuration options.
