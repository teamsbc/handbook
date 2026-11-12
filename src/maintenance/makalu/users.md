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

### SSH public-key authentication

When an encrypted home area is inactive, SSH cannot read its usual
`~/.ssh/authorized_keys` file. Instead, you can store authorized public keys in
the user's homed record, which is available before the home area is unlocked.
For example, copy the public keys to a file on the TeamSBC device and import it:

```console
$ homectl update alice --ssh-authorized-keys=@/path/to/authorized_keys
```

The file uses the same format as `~/.ssh/authorized_keys`. The keys are imported
into the record, so later changes to the file do not update the record. When
updating the list, include every key that should remain authorized. Inspect the
keys available from the record with:

```console
$ userdbctl ssh-authorized-keys alice
```

The SSH server must also be configured to look up keys in user records. Check
its effective configuration with `sshd -T`. If no authorized keys command is
configured, add the following settings to the SSH server configuration, for
example in `/etc/ssh/sshd_config.d/10-homed.conf`:

```text
AuthorizedKeysCommand /usr/bin/userdbctl ssh-authorized-keys %u
AuthorizedKeysCommandUser root
```

Check the configuration and restart the server:

```console
$ sshd -t
$ sshd -T | grep -i authorizedkeyscommand
$ systemctl restart sshd.service
```

The effective configuration should show the command and user above. Keep an
existing session open while testing a new connection. If another
`AuthorizedKeysCommand` is in use, consult [userdbctl(1)](https://www.freedesktop.org/software/systemd/man/latest/userdbctl.html#Integration%20with%20SSH)
about chaining commands before changing it.

An SSH key authenticates the connection but does not supply the secret needed to
unlock an encrypted home. When the home is inactive, an interactive login can
therefore prompt for the home password after accepting the SSH key. This is
separate from any passphrase used to unlock the SSH private key on the client.

Non-interactive commands and file transfers may be unable to answer the home
password prompt. Test these workflows with the home inactive and without relying
on credentials from a recent unlock: a successful command immediately after an
interactive login does not establish that unattended access will work later.
Once the home is active, the user's own SSH private keys can remain in `~/.ssh`
for outgoing connections.

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
