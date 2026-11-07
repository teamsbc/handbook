# Troubleshooting Basics on Lhotse

> [!NOTE]
> This section applies to the [Lhotse](/getting-started/variants.md#lhotse) variant.
> For the other variant, see [Troubleshooting Basics on Makalu](/troubleshooting/makalu/basics.md).

Start with the checks below and note any error messages. Administrative commands
may require root privileges; see [Privilege Escalation](/maintenance/lhotse/basics.md#privilege-escalation).

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
`wlan0` with the wireless interface. See [Networking](/maintenance/lhotse/networking.md)
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
authentication alone is not sufficient. See [Users](/maintenance/lhotse/users.md)
for the login workflow.

## Package and update failures

Read the error from `dnf` and check network connectivity and disk space before
retrying. To inspect configured repositories and the recent transaction history:

```console
$ dnf repolist
$ dnf history
```

If an automatic update did not run, check its timer and service logs:

```console
$ systemctl status dnf5-automatic.timer
$ journalctl -b -u dnf5-automatic.service
```

The timer runs on a schedule; enabling it does not necessarily run an update
immediately. See [Updating](/maintenance/lhotse/updating.md) and
[Applications](/maintenance/lhotse/applications.md) for the normal workflows.
