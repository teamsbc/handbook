# Introduction

Thank you for your interest in **TeamSBC Linux**. TeamSBC brings together Fedora packages and a set of choices about how a system should boot, manage users, configure networking, and stay maintained. This chapter introduces those choices so you know what to expect before installing it.

You can read this chapter to learn:

- What TeamSBC is.
- How TeamSBC relates to Fedora.
- Why TeamSBC prefers an integrated approach to system administration.
- The goals of the project.
- Where the name TeamSBC comes from.

## What is TeamSBC?

TeamSBC is a Linux distribution aimed at single board computers and virtual machines. It provides disk images that you can use as a starting point for a device, then configure for the tasks you want it to perform.

The project is intended for people who enjoy exploring and working with their systems. You might be experimenting with a board, setting up a small server, or investigating how an image is assembled. TeamSBC is still developing, and the [intended audience](../preface/intended-audience.md) page explains what that means for getting started.

## Relation to Fedora

TeamSBC is a Fedora Remix. It uses Fedora packages as its foundation and adds packages and configuration of its own. This lets the project build on Fedora's work while making its own decisions about which components belong in an image and how they fit together.

That relationship will feel familiar if you have used Fedora before, especially when managing packages on the Lhotse variant. However, the default services and administration tools can differ. Instructions written for Fedora may assume tools that TeamSBC does not use by default, so it helps to understand the differences below.

## Differences with Fedora

The most visible differences are in the tools used for everyday system administration. The handbook's maintenance chapters explain how to work with them on each variant.

### `systemd`

TeamSBC prefers to use `systemd` functionality when possible. The goal is a smaller, more integrated system whose components follow related configuration and administration conventions.

This preference extends beyond starting services. Booting, local user management, networking, and running commands with elevated privileges all use tools from the same project. Learning those tools helps you understand several parts of a TeamSBC installation.

#### `systemd-boot`

TeamSBC uses `systemd-boot` as its bootloader, so it needs a UEFI boot environment. When setting up a virtual machine, choose UEFI firmware. For physical devices, use the image intended for your board and follow the [installation instructions](./installation.md).

#### `systemd-homed`

TeamSBC prefers `systemd-homed` for managing local users and their home areas. This is a different approach from the traditional account-management tools you may have used on Fedora or other distributions.

See [managing users on Lhotse](../maintenance/lhotse/users.md) or [managing users on Makalu](../maintenance/makalu/users.md) for the documentation for your variant.

#### `systemd-networkd`

TeamSBC uses `systemd-networkd` for network configuration in place of Fedora's usual `NetworkManager`. If you are accustomed to configuring connections through `nmcli`, you will need to use the TeamSBC approach instead.

See [managing networks on Lhotse](../maintenance/lhotse/networking.md) or [managing networks on Makalu](../maintenance/makalu/networking.md) for the documentation for your variant.

#### `sudo`

TeamSBC does not include `sudo` by default. Use `run0` when you need to run a command as root. The [Lhotse basics chapter](../maintenance/lhotse/basics.md) includes examples of using it for administration.

Some installation and provisioning examples in this handbook use `sudo` on the computer preparing an image. Those commands run on your host computer, whose tools may differ from the TeamSBC system you are setting up.

## Goals of TeamSBC

The goal is to provide a simple, minimal, integrated approach to running your favorite single board computers reliably and safely. TeamSBC aims to build on upstream projects and use their functionality directly where it fits the distribution's needs.

These goals guide the selection of components and defaults. They also leave room for you to adapt an installation or [build a customized image](../customization/build-your-own.md) for your own use.

## What does the name mean?

The name comes from what the distribution targets. SBC stands for Single Board Computer: a small computer built around a single circuit board, such as devices in the Raspberry Pi series or various Radxa boards. The team part comes from, well, team. The [supported devices list](./installation.md#supported-devices) shows which devices have images available in this handbook.

Next, read about the [variants](./variants.md) to choose the approach to system maintenance that you want to explore.
