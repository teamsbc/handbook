# Introduction

Thank you for your interest in TeamSBC. In this chapter we will go over what TeamSBC is and how it is structured.

You can read this chapter to learn:

- What TeamSBC is.
- How TeamSBC relates to Fedora.
- The goals of TeamSBC.
- Where the name TeamSBC comes from.
- The history of TeamSBC.

## What is TeamSBC?

TeamSBC is a Linux distribution.

## Relation to Fedora

TeamSBC is a Fedora Remix. This means that it takes its packages from Fedora but then layers its own on top. TeamSBC makes its own decisions on service configuration, what services are used for what, and what should be installed on a system.

## Differences with Fedora

If you are a Fedora user or have used it previously then it's useful to know that there are differences and of course what those differences are.

### `systemd`

TeamSBC prefers to use `systemd` functionality when possible. This leads to a smaller and more integrated system.

#### `systemd-boot`

TeamSBC uses `systemd-boot` as its bootloader; this means it only works on UEFI capable systems.

#### `systemd-homed`

Fedora doesn't use `systemd-homed` by default. TeamSBC has it set up and prefers to use it whenever possible to manage local users. See [managing users](./maintenance/users.md) for more information on how to use `systemd-homed`.

#### `systemd-networkd`

Fedora uses `NetworkManager` to manage networks, TeamSBC uses `systemd-networkd`. See [managing networks](./maintenance/networking.md) how this works.

#### `sudo`

TeamSBC does not include `sudo` by default instead you can use `run0`.

## Goals of TeamSBC

To provide an integrated, simplistic, minimal, and upstream based approach to running your favorite single board computers in a reliable and safe way.

## What does the name mean?

The name comes from what the distribution targets. SBC stands for Single Board Computer, these are small computers such as the Raspberry Pi series of devices, various Radxa boards, or others. The team part comes from, well, team.

## History of TeamSBC
