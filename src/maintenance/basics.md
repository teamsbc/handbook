# Basics

This section covers fundamental system administration tasks on TeamSBC.

## Privilege Escalation

TeamSBC does not include `sudo`. Instead you can use `run0` to run commands as root.

```console
$ run0 hostnamectl set-hostname mydevice
```

## Managing Services

Services are managed through `systemctl`.

### Starting and stopping a service

```console
$ run0 systemctl start sshd.service
$ run0 systemctl stop sshd.service
```

### Enabling and disabling a service

Enabling a service means it will start automatically on boot. Disabling it removes that behavior.

```console
$ run0 systemctl enable sshd.service
$ run0 systemctl disable sshd.service
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
$ run0 timedatectl set-timezone Europe/Amsterdam
```
