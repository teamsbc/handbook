# Provisioning

Setting up your device with credentials and configuration so it can be used immediately is what is called provisioning. There are multiple ways to do so.

When building [customized images](../customization/build-your-own.md) you can perform the above steps during the build process. Provisioning such as described here is for per-deployment configuration while doing customized builds is for configuration to be used in multiple deployments.

Good examples of per-deployment configuration is setting passwords or network credentials while multiple deployments might involve the packages installed on the systems. Use your own judgement.

## Online Provisioning

The standard process of setting up your device is through guided prompts provided by `systemd-firstboot` during the first time your device boots. To do so you will need to connect a monitor or serial to your device.

During the boot process you will be prompted for the timezone and root password for your device. After those have been filled in the boot will continue and you can login to your device to do any further customization and configuration you might want to do.

## Offline Provisioning

If you want the device to finish its boot without having to connect peripherals to it you can also pre-customize the image before flashing it onto your storage media.

To prevent the online provisioning through `systemd-firstboot` you want to set at least the timezone and the root password on an image before writing it to your storage media.

You can use the `systemd-firstboot --image` to do so:

```
$ sudo systemd-firstboot \
  --image teamsbc-44-standard-rpi4.raw \
  --prompt-root-password \
  --prompt-timezone
```

More options are available to be configured, but they won't hold the boot process from continuing.

When doing offline provisioning you likely want to enable the `sshd` service on the system as well so you can login after it comes online. You can do so with:

```
$ sudo systemctl \
  --image teamsbc-44-standard-rpi4.raw \
  enable sshd.service
```

