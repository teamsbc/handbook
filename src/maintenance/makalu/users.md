# Users on Makalu

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

TeamSBC prefers `systemd-homed` for managing regular local users and their home
areas. It supports portable home areas that can be encrypted and unlocked when
the user logs in; encryption depends on the selected storage type. TeamSBC
integrates `systemd-homed` with local and remote logins.

Traditional tools such as `useradd` and `passwd` can also manage conventional
accounts when available. `homectl` manages `systemd-homed` accounts, not those
traditional accounts.

On Makalu, user records and home data are stored outside the versioned `/usr`
partition and are preserved during normal OS updates.

The examples below use `alice`; replace it with your chosen username.

## Managing Users

### Adding a user

Create the user account and its home area:

```console
$ homectl create alice
```

Follow the prompts to set the user's password.

### Logging in

The user can log in at the console or through SSH with the same username and
password. The home area is activated during login.

For SSH access, enable and start the SSH server on the TeamSBC device:

```console
$ systemctl enable --now sshd.service
```

From another computer with an SSH client, connect to the device:

```console
$ ssh alice@device-address
```

Replace `device-address` with the device's hostname or IP address. The device must
be reachable over the network.

For an encrypted home area, the login password also supplies the credential used
to unlock it through
[pam_systemd_home(8)](https://www.freedesktop.org/software/systemd/man/latest/pam_systemd_home.html).
SSH public-key authentication alone cannot unlock a locked, encrypted home area.

### Listing users

List the accounts managed by `systemd-homed`:

```console
$ homectl list
```

This list does not include traditional accounts such as `root` or system service
accounts.

### Inspecting a user

Show the account details, home storage type, and current state:

```console
$ homectl inspect alice
```

### Removing a user

> [!WARNING]
> Removing a user also deletes their home area and all data in it. There is no
> confirmation prompt. Back up any data you need before running the command.

Have the user log out of all sessions, then remove the account from another
root session:

```console
$ homectl remove alice
```

See [homectl(1)](https://www.freedesktop.org/software/systemd/man/latest/homectl.html)
for more account and home-area management options.

For help with problems, see [Troubleshooting on Makalu](/troubleshooting/makalu/basics.md#user-login).
