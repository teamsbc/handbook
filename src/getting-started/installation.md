# Installation

TeamSBC builds and provides specific disk images that are optimized for specific devices. Disk images are provided for each [variant](../getting-started/variants.md). Before starting any installation pick the variant you want to use and familiarize yourself with its concepts.

Installation on single board computers involves downloading the appropriate image for the device you have and then copying the disk image onto its storage. Usually a micro SD card.

## Installation Steps

Installation steps are the same for all TeamSBC variants.

1. Find the image for your device in the [supported devices list](#supported-devices) and download it on your system.

When testing out in a virtual machine; point your preferred virtual machine manager at the disk image and run, otherwise continue on.

### microSD

Most Single Board Computers have some form of external storage, commonly a microSD card. Put a microSD card into a card reader attached to your computer. After this you can write the downloaded image directly onto the microSD card. This method applies to most Single Board Computers that have microSD storage.

1. Find the device for your microSD card (let's say it's `/dev/sde`).
2. Unpack the image, `unxz teamsbc-44-standard-rpi4.raw.xz`.

If you wish this is the time to perform [offline provisioning](./provisioning.md#offline) on the disk image.

3. Write the image onto the microSD card, `dd if=teamsbc-44-standard-rpi4.raw of=/dev/sde progress=verbose`.

After the image has been written to your microSD card you can unmount your card and plug it into your device to boot from.

## Supported Devices

Find the device you want to run TeamSBC on in the following list. If your device is not listed that means we don't produce images for it. You might want to [file a request](https://github.com/teamsbc/distribution) to see if it can be a supported device in the future.

### Virtual Machine

To run TeamSBC on virtual machines we provide the `virt` image type for the [standard](../getting-started/variants.md#standard) variant. You can download the latest built images from the following URLs:

#### Stable

##### x86_64

- [TeamSBC 44 Standard (virt, x86_64)](https://artifacts.teamsbc.net/main/latest/44/x86_64/teamsbc-44-standard-virt-x86_64.raw.xz)

##### aarch64

- [TeamSBC 44 Standard (virt, aarch64)](https://artifacts.teamsbc.net/main/latest/44/aarch64/teamsbc-44-standard-virt-aarch64.raw.xz)

#### Experimental

##### x86_64

- [TeamSBC 45 Standard (virt, x86_64)](https://artifacts.teamsbc.net/main/latest/45/x86_64/teamsbc-45-standard-virt-x86_64.raw.xz)

##### aarch64

- [TeamSBC 45 Standard (virt, aarch64)](https://artifacts.teamsbc.net/main/latest/45/aarch64/teamsbc-45-standard-virt-aarch64.raw.xz)

### Single Board Computers

#### Raspberry Pi 4

To run TeamSBC on the Raspberry Pi 4 we provide the `rpi4` image type for the [standard](../getting-started/variants.md#standard) variant. You can download the latest built images from the following URLs.

#### Stable

##### aarch64

- [TeamSBC 44 Standard (rpi4, aarch64)](https://artifacts.teamsbc.net/main/latest/44/aarch64/teamsbc-44-standard-rpi4-aarch64.raw.xz)

#### Experimental

##### aarch64

- [TeamSBC 45 Standard (rpi4, aarch64)](https://artifacts.teamsbc.net/main/latest/45/aarch64/teamsbc-45-standard-rpi4-aarch64.raw.xz)
