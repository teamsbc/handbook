# Users

*You are able to manage users in more traditional ways through the `shadow-utils` provided tooling (`useradd`, `passwd`, etc) but TeamSBC intends for you to manage users through `systemd-homed`.*

The preferred way in TeamSBC to manage local users is by using `systemd-homed`. This allows for portable, encrypted home directories for each user which get unlocked on user login. TeamSBC is configured to allow local and remote logins to `systemd-homed` managed users by default.

## Managing Users

### Adding a user

```console
$ homectl create $username
# pick a password
```

### Removing a user

Removing users is a destructive action. Their home area will be destroyed and thus all data in there will be gone forever. Think twice if this is what you want and consider making a backup of the relevant home area.

If you are certain you want to remove the user you can use the following command. **There is no confirmation prompt, the user will be gone immediately.**

```console
$ homectl remove $username
```

### Inspecting a user

```console
$ homectl inspect $username
```
