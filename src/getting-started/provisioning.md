# Provisioning

Provisioning means giving an installation the credentials and configuration it needs for your use. For example, you can set its timezone and root password, then prepare the access you will need to administer the device.

This chapter describes configuration for an individual installation. If you want the same package selection or shared configuration across several devices, consider [building a customized image](../customization/build-your-own.md). You can then provision each installation with the settings specific to that device, such as its credentials.

## Choosing a Method

You can complete the initial setup while the device boots for the first time or prepare the disk image on another computer before booting it.

| Method | Where you work | When to use it |
| --- | --- | --- |
| Online provisioning | On the device through its local, serial, or virtual machine console | You can interact with the first-boot prompts |
| Offline provisioning | On the host computer preparing the unpacked disk image | You want to set initial values before booting or prepare for use without a local console |

Here, online provisioning means interactive setup on the running device; it does not mean you need an internet connection to answer the prompts. Offline provisioning modifies the image file before you attach it to a virtual machine or write it to physical storage.

## Online Provisioning

> [!NOTE]
> `systemd-firstboot` only shows its prompts on the console. On Single Board Computers this usually means the serial console. Hence if you use this you need to attach to the UART of your board and often can't use HDMI or an attached screen.

The standard setup uses guided prompts from `systemd-firstboot` the first time your device boots. Connect a display and keyboard or a serial console before powering it on. When using a virtual machine, open its console.

During boot, you will be asked to choose a timezone and set the root password. That password is for the TeamSBC installation you are setting up. Keep it available for your first login and subsequent administration.

After you complete the prompts, booting continues to the login prompt. Log in as `root` using the password you set, then continue with [after provisioning](#after-provisioning) to configure the installation for everyday use.

## Offline Provisioning

> [!WARNING]
> If you provision your image offline using `systemd` tooling older than version 262 (as documented here) you must create the `.autorelabel` file in the filesystem root of the image. The relevant version is that of the tooling on the host performing the provisioning. This is due to [a bug in `systemd`](https://github.com/systemd/systemd/issues/42643) where it assigns the wrong SELinux contexts to certain files. The bug is fixed in version 262, so this workaround is unnecessary when provisioning with `systemd` 262 or newer. The workaround will incur an additional reboot when you boot your image for the first time. See [auto-relabeling](#auto-relabeling) for how to do so.

Offline provisioning lets you set initial values in the image before the device boots. Run the commands in this section on the Linux host computer preparing the image, after [unpacking the download](./installation.md#download-and-unpack) and before writing it to storage or starting a virtual machine.

The host needs the `systemd` image-management tools used below. The examples use `sudo` to run them as root on that host; this is separate from TeamSBC's use of `run0` on the installed system. Replace `teamsbc-46-lhotse-rpi4.raw` throughout with your unpacked image's filename.

### Set the Initial Values

Set at least the timezone and root password to avoid waiting for those prompts during first boot. Use `systemd-firstboot --image` to configure the image:

```console
$ sudo systemd-firstboot \
  --image teamsbc-46-lhotse-rpi4.raw \
  --prompt-root-password \
  --prompt-timezone
```

The command prompts you on the host computer, but saves your answers in the image. The root password you enter belongs to the future TeamSBC installation; it does not change the host's password. Other settings can also be configured, but the timezone and root password are the values needed for the initial prompts described here.

### Prepare Remote Access

If you plan to administer the device remotely, enable its SSH service in the image:

```console
$ sudo systemctl \
  --image teamsbc-46-lhotse-rpi4.raw \
  enable sshd.service
```

This enables `sshd` for subsequent boots of the TeamSBC installation. It does not start an SSH server on your host computer.

Enabling the service is only part of preparing remote access. The device also needs a working network connection and an account whose authentication is allowed by its SSH configuration. Setting the root password alone does not guarantee remote root login. If you have not prepared those details, keep a console available for the first boot so you can finish the setup.

See [users on Lhotse](../maintenance/lhotse/users.md) or [users on Makalu](../maintenance/makalu/users.md) for user-management instructions. Networking is documented in [networking on Lhotse](../maintenance/lhotse/networking.md); the corresponding [Makalu networking](../maintenance/makalu/networking.md) chapter is still being written.

### Auto Relabeling

If you performed any of the above actions using host `systemd` tooling older than version 262, you will need to touch the `.autorelabel` file in the filesystem root of your image to correct its SELinux labels. This will incur a reboot during the first boot of your system and take some time. You can skip this section if you provisioned the image using `systemd` 262 or newer.

Create an empty marker file on your host and copy it into the image's filesystem root as `/.autorelabel`:

```console
$ touch autorelabel
$ sudo systemd-dissect --copy-to teamsbc-46-lhotse-rpi4.raw autorelabel /.autorelabel
$ rm autorelabel
```

The final command removes the temporary file from the host; the marker remains in the image. During first boot, the system uses it to trigger relabeling. Allow that process and the additional reboot to finish before attempting to log in.

For more information you can read the related [TeamSBC Bug](https://github.com/teamsbc/distribution/issues/29) or [`systemd` bug](https://github.com/systemd/systemd/issues/42643).

### Boot the Prepared Image

After provisioning and adding the relabel marker where required, return to [installation](./installation.md#virtual-machine-setup) to attach the image to a virtual machine or [write it to your microSD card](./installation.md#microsd). Make sure you use the same image file you modified.

The timezone and root password are already set, so boot can continue without asking for those values. Use the console or your prepared remote access to log in once the system is ready.

## After Provisioning

Initial provisioning gives you access to the system. From there, configure it for the job you want it to do:

- Set up the local users you want to use for everyday work. See [users on Lhotse](../maintenance/lhotse/users.md) or [users on Makalu](../maintenance/makalu/users.md).
- Configure networking for your environment and confirm how you will reach the device. See [networking on Lhotse](../maintenance/lhotse/networking.md) or [networking on Makalu](../maintenance/makalu/networking.md).
- Familiarize yourself with service management and system logs in [basics on Lhotse](../maintenance/lhotse/basics.md) or [basics on Makalu](../maintenance/makalu/basics.md).
- Follow the update and application-installation instructions for your chosen variant in the maintenance chapters. Makalu's maintenance instructions are still being documented.

If a step is unclear or your device behaves differently from these instructions, [join the community](../preface/community.md) and share what you are working with.
