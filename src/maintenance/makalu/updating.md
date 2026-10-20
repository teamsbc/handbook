# Updating on Makalu

For the other variant, see [Updating on Lhotse](/maintenance/lhotse/updating.md).

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

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

Reboot after installing an OS update to start using the new version.

```console
# systemctl reboot
```

## Automatic updates

To download and install updates automatically, enable and start the update timer:

```console
# systemctl enable --now systemd-sysupdate-update.timer
```

The default schedule runs the update service:

- 15 minutes after boot, plus a random delay of up to 4 hours.
- Repeatedly while the system stays up, 2 hours after the previous update service
  started, plus a new random delay of up to 4 hours (roughly every 2–6 hours).
- Each Saturday at midnight local time, plus a random delay of up to 4 hours.
  If this weekly run is missed while the timer is inactive, for example because
  the system is powered off, it is caught up when the timer next starts, still
  subject to the random delay.

Starting the timer schedules these runs; it does not necessarily check for
updates immediately. Use `updatectl check` or `updatectl update` as described
above if you want to check for or install updates straight away.

This timer does not reboot the system. Updates take effect after the next reboot,
which you can perform manually as described above or automate with the separate
reboot timer.

### Automatic reboots

To reboot automatically when a newer OS version has been installed, enable and
start the reboot timer as well:

```console
# systemctl enable --now systemd-sysupdate-reboot.timer
```

By default, this timer runs daily at 04:10 local time, with a random delay of up to
30 minutes. It only reboots if an installed OS update is waiting to be activated.
It does not reboot immediately after each update finishes.

Check the scheduled update and reboot times with:

```console
# systemctl list-timers 'systemd-sysupdate-*'
```

See [systemd-sysupdate(8)](https://www.freedesktop.org/software/systemd/man/latest/systemd-sysupdate.html)
for details about the separate update and reboot services, and the upstream
[update timer definition](https://github.com/systemd/systemd/blob/v262/units/systemd-sysupdate-update.timer)
and [systemd.timer(5)](https://www.freedesktop.org/software/systemd/man/latest/systemd.timer.html)
for the default update schedule and timer behavior.
