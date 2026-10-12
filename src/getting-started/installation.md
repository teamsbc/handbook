# Installation

TeamSBC provides disk images prepared for specific devices and virtual machines. Installation starts with choosing the right image, unpacking it, and either attaching it to a virtual machine or writing it to your device's storage.

Before downloading an image, read about the [variants](./variants.md) and decide which one you want to use. Then find an image that matches your device and architecture in the [supported devices list](#supported-devices).

## Before You Start

You will need:

- A device with a matching TeamSBC image, or a virtual machine configured for the image's architecture and UEFI booting.
- A computer to download and unpack the image. The command examples below assume a Linux host.
- Enough free space on that computer for the compressed download and the unpacked disk image.
- For a physical device, storage large enough to hold the unpacked image and a way to write to it, such as a microSD card and card reader.
- A way to interact with the device during first boot, such as a display and keyboard, a serial console, or a virtual machine console. If you plan to prepare the image for use without a local console, read [offline provisioning](./provisioning.md#offline-provisioning) before writing it to storage.

Commands in this chapter run on the computer preparing the image. Replace the example filename with the image you downloaded and the example device path with your actual destination device.

## Installation Steps

The overall process is the same for both variants, although available images differ by device.

### Download and Unpack

Download the compressed disk image for your device, architecture, and variant. For example, a Raspberry Pi 4 image is different from a virtual machine image, even when both use the same processor architecture.

Unpack the download on your host computer:

```sh
unxz teamsbc-46-lhotse-rpi4.raw.xz
```

This produces a `.raw` disk image and removes the compressed `.xz` file. The raw image contains the disk layout and filesystems that the device will use; it is the file you will attach to a virtual machine or write to storage.

### Choose How to Provision

If you will have access to a console during first boot, you can leave the image as it is and complete the guided setup after booting.

If you want to set the timezone and root password beforehand, perform [offline provisioning](./provisioning.md#offline-provisioning) on the unpacked image now. This is also the time to prepare any remote-access configuration you will need. Changes made to the image at this stage are included when you write it to the destination storage.

After preparing the image, follow the route below for a virtual machine or a physical device.

### Virtual Machine Setup

Use a `virt` image that matches the architecture you intend to run. In your preferred virtual machine manager, create a machine using the unpacked raw image as its existing disk rather than as installer media. Configure the machine to use UEFI firmware, since TeamSBC uses `systemd-boot`.

Open the virtual machine console and start it. Continue with [first boot](#first-boot) below. You do not need to write the image to a microSD card.

### microSD

Many single board computers boot from a microSD card. Insert the card into a reader attached to your host computer and identify its device path using your host's disk utility. Compare the device's capacity and model with the card you inserted. If needed, compare the device list before and after inserting the card.

The example below uses `/dev/sde` for the whole card. Your device path may be different. Use the whole-device path rather than a partition path such as `/dev/sde1`, and unmount any mounted partitions on the card before writing.

> [!WARNING]
> Writing the image overwrites the destination device's contents. Confirm the device path and copy any files you want to keep before running the command.

Write the unpacked image to the card:

```sh
sudo dd if=teamsbc-46-lhotse-rpi4.raw of=/dev/sde bs=4M conv=fsync status=progress
```

Here, `if` identifies the image file and `of` identifies the destination device. The command uses `sudo` for the permissions needed on the host computer to write directly to a disk. If your host uses another way to run commands as root, use that instead.

Wait for the command to finish successfully, then safely eject the card. Insert it into your board while the board is powered off.

### First Boot

Connect the display and keyboard or serial console you plan to use, then power on the device. For a virtual machine, use its console.

If you have not configured the timezone and root password beforehand, `systemd-firstboot` will prompt for them during boot. Complete those prompts as described in [online provisioning](./provisioning.md#online-provisioning). If you prepared the image offline, follow any remaining steps in the provisioning chapter, including SELinux relabeling where required.

Once booting completes, you can log in and continue with [after provisioning](./provisioning.md#after-provisioning) to set up users, networking, and other configuration for your device.

## Supported Devices

Find the device you want to run TeamSBC on in the following list. If your device is not listed that means we don't produce images for it. You might want to [file a request](https://github.com/teamsbc/distribution) to see if it can be a supported device in the future.

### Virtual Machine

To run TeamSBC on virtual machines we provide the `virt` image type for both [Lhotse](./variants.md#lhotse) and [Makalu](./variants.md#makalu) on `x86_64` and `aarch64`. You can download the latest built images from the following URLs:

#### Experimental

##### x86_64 {#x86_64}

- [TeamSBC 46 Lhotse (virt, x86_64)](https://artifacts.teamsbc.net/main/46/x86_64/teamsbc-lhotse-virt/index.html)
- [TeamSBC 46 Makalu (virt, x86_64)](https://artifacts.teamsbc.net/main/46/x86_64/teamsbc-makalu-virt/index.html)

##### aarch64

- [TeamSBC 46 Lhotse (virt, aarch64)](https://artifacts.teamsbc.net/main/46/aarch64/teamsbc-lhotse-virt/index.html)
- [TeamSBC 46 Makalu (virt, aarch64)](https://artifacts.teamsbc.net/main/46/aarch64/teamsbc-makalu-virt/index.html)

### Single Board Computers

#### Raspberry Pi 4

To run TeamSBC on the Raspberry Pi 4 we provide the `rpi4` image type for both [Lhotse](./variants.md#lhotse) and [Makalu](./variants.md#makalu). You can download the latest built images from the following URLs.

#### Experimental

##### aarch64

- [TeamSBC 46 Lhotse (rpi4, aarch64)](https://artifacts.teamsbc.net/main/46/aarch64/teamsbc-lhotse-rpi4/index.html)
- [TeamSBC 46 Makalu (rpi4, aarch64)](https://artifacts.teamsbc.net/main/46/aarch64/teamsbc-makalu-rpi4/index.html)


#### Raspberry Pi 5

To run TeamSBC on the Raspberry Pi 5 we provide the `rpi5` image type for both [Lhotse](./variants.md#lhotse) and [Makalu](./variants.md#makalu). You can download the latest built images from the following URLs.

#### Experimental

##### aarch64

- [TeamSBC 46 Lhotse (rpi5, aarch64)](https://artifacts.teamsbc.net/main/46/aarch64/teamsbc-lhotse-rpi5/index.html)
- [TeamSBC 46 Makalu (rpi5, aarch64)](https://artifacts.teamsbc.net/main/46/aarch64/teamsbc-makalu-rpi5/index.html)
