---
prev: false
---

# Basics on Lhotse {#basics}

> [!NOTE]
> This section applies to the [Lhotse](/getting-started/variants.md#lhotse) variant.
> For the other variant, see [Basics on Makalu](/maintenance/makalu/basics.md).

This section covers fundamental system administration tasks on TeamSBC.

## Privilege Escalation

TeamSBC does not include `sudo`. Use `run0` to run commands as root. For example, to set the hostname:

```console
$ run0 hostnamectl set-hostname mydevice
```

> [!NOTE]
> Commands in the maintenance section are expected to be run as root, so the examples omit `run0`.

> [!WARNING]
> Some commands can fail when run with `run0` because of an [SELinux issue](https://github.com/teamsbc/distribution/issues/64). If a command fails, try `run0 --via-shell` before the command.

## Managing Services

Services are managed through `systemctl`.

### Starting and stopping a service

```console
$ systemctl start sshd.service
$ systemctl stop sshd.service
```

### Enabling and disabling a service

Enabling a service means it will start automatically on boot. Disabling it removes that behavior.

```console
$ systemctl enable sshd.service
$ systemctl disable sshd.service
```

### Checking service status

```console
$ systemctl status sshd.service
```

## Viewing Logs

System logs are managed by `journald` and can be viewed with `journalctl`.

### Viewing logs for a specific service

```console
$ journalctl -u sshd.service
```

### Following logs in real time

```console
$ journalctl -f
```

### Viewing logs from the current boot

```console
$ journalctl -b
```

## System Information

### Hostname

```console
$ hostnamectl
```

### Time and timezone

```console
$ timedatectl
```

To change the timezone:

```console
$ timedatectl set-timezone Europe/Amsterdam
```
