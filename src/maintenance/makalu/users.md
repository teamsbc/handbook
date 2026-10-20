# Users on Makalu

For the other variant, see [Users on Lhotse](/maintenance/lhotse/users.md).

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

Makalu uses the same `systemd-homed` workflow as Lhotse for managing local users
and their home areas. `systemd-homed` supports portable, encrypted home areas
that are unlocked when the user logs in. Both variants enable its integration
with the system's login configuration.

Use `homectl` to manage these regular user accounts. The account records and home
data are stored outside Makalu's versioned `/usr` partition and are preserved
during normal OS updates.

The examples below use `alice`; replace it with your chosen username. Run the
administrative commands from an existing administrator account using `run0`.
If you are logged in as `root` after provisioning, omit `run0`.

## Adding a user

Create the user account and its home area:

```console
$ run0 homectl create alice
```

Follow the prompts to set the user's password.

## Logging in

The user can log in at the console or through SSH with the same username and
password. The home area is activated during login.

For SSH access, enable and start the SSH server on the TeamSBC device:

```console
$ run0 systemctl enable --now sshd.service
```

From another computer with an SSH client, connect to the device:

```console
$ ssh alice@device-address
```

Replace `device-address` with the device's hostname or IP address. The device must
be reachable over the network, and its SSH configuration must allow password
authentication through PAM.

For an encrypted home area, the login password also supplies the credential used
to unlock it through
[pam_systemd_home(8)](https://www.freedesktop.org/software/systemd/man/latest/pam_systemd_home.html).
SSH public-key authentication alone cannot unlock a locked, encrypted home area.

## Listing users

List the accounts managed by `systemd-homed`:

```console
$ homectl list
```

This list does not include traditional accounts such as `root` or system service
accounts.

## Inspecting a user

Show the account details, home storage type, and current state:

```console
$ run0 homectl inspect alice
```

## Removing a user

> [!WARNING]
> Removing a user also deletes their home area and all data in it. There is no
> confirmation prompt. Back up any data you need before running the command.

Have the user log out of all sessions, then remove the account from another
administrator account or a root session:

```console
$ run0 homectl remove alice
```

See [homectl(1)](https://www.freedesktop.org/software/systemd/man/latest/homectl.html)
for more account and home-area management options.
