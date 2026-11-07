# Troubleshooting Basics on Makalu

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.
> For the other variant, see [Troubleshooting Basics on Lhotse](/troubleshooting/lhotse/basics.md).

Start with the checks below and note any error messages. Administrative commands
may require root privileges; see [Privilege Escalation](/maintenance/makalu/basics.md#privilege-escalation).

## Services and logs

Check for failed services, then inspect the status and logs of a service involved
in the problem. Replace `sshd.service` with the relevant service:

```console
$ systemctl --failed
$ systemctl status sshd.service
$ journalctl -b -u sshd.service
```

`-b` limits the log to the current boot. If the problem happened before a
reboot, `journalctl --list-boots` shows the available boots; use `-b -1` for the
previous boot if its logs are available.

## Networking

Check the interface, its selected configuration and DNS settings. Replace `eth0`
with the interface name shown by `networkctl`:

```console
$ networkctl
$ networkctl status eth0
$ resolvectl status
```

If an address or route is missing, check the selected `.network` file and the
networkd logs:

```console
$ journalctl -b -u systemd-networkd.service
```

For Wi-Fi, also check `systemctl status wpa_supplicant@wlan0.service`, replacing
`wlan0` with the wireless interface. See [Networking](/maintenance/makalu/networking.md)
for configuration instructions. If a network change disconnects SSH, use a local
console or another working connection to inspect and correct the configuration.

## Disk space

Check free space and inode availability on mounted filesystems:

```console
$ df -h
$ df -i
```

If a filesystem is full, identify and remove unneeded data or expand the storage
before retrying. Review what files contain before deleting them.

## User login

Check a home area's status and the homed service logs, replacing `alice` with the
username:

```console
$ homectl inspect alice
$ journalctl -b -u systemd-homed.service
```

A locked encrypted home area needs a credential to unlock it; SSH public-key
authentication alone is not sufficient. See [Users](/maintenance/makalu/users.md)
for the login workflow.

## Update failures

Check the current and available versions, then inspect the sysupdate service logs:

```console
$ cat /etc/os-release
$ updatectl check
$ journalctl -b -u systemd-sysupdate.service
```

If an automatic update did not run, check the timer and update service logs:

```console
$ systemctl status systemd-sysupdate-update.timer
$ journalctl -b -u systemd-sysupdate-update.service
```

Check networking and disk space if downloads or installations fail. An installed
OS update only takes effect after a reboot; see [Updating](/maintenance/makalu/updating.md).

## System extension failures

Check whether the feature is enabled, the image is present, and the extension is
merged. Replace `tmux` with the feature you are checking:

```console
$ updatectl features tmux
$ systemd-sysext list
$ systemd-sysext status
$ journalctl -b -u systemd-sysext.service
```

An enabled feature is not necessarily downloaded or active. If an OS update is
waiting for a reboot, reboot into it before downloading an extension for the
running system. See [Applications](/maintenance/makalu/applications.md) for the
installation and activation steps.
