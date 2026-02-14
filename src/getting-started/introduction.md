# Introduction

Thank you for your interest in TeamSBC. In this chapter we will go over what TeamSBC is and how it is structured.

You can read this chapter to learn:

- What TeamSBC is.
- How TeamSBC relates to Fedora.
- The history of TeamSBC.
- The goals of TeamSBC.
- Where the name TeamSBC comes from.

## What is TeamSBC?

TeamSBC is a Linux distribution.

## Relation to Fedora

TeamSBC is a Fedora Remix. This means that it takes its packages from Fedora but then layers its own on top. TeamSBC makes its own decisions on service configuration, what services are used for what, and what should be installed on a system.

## Differences with Fedora

If you are a Fedora user or have used it previously then it's useful to know what the differences are.

### `systemd`

TeamSBC prefers to use `systemd` functionality when possible. This leads to a smaller and more integrated system.

#### `systemd-homed`

Fedora doesn't use `systemd-homed` by default. TeamSBC has it set up and prefers to use it whenever possible to manage local users. See [managing users](./maintenance/users.md) for more information on how to use `systemd-homed`.

#### `systemd-networkd`

Fedora uses `NetworkManager` to manage networks, TeamSBC uses `systemd-networkd`. See [managing networks](./maintenance/networking.md) how this works.

## History of TeamSBC

## Goals of TeamSBC

## What does the name mean?
