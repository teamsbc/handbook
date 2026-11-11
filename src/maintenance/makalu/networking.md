---
next: false
---

# Networking on Makalu

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

TeamSBC uses `systemd-networkd` for network configuration instead of `NetworkManager`. Network configuration files are placed in `/etc/systemd/network/`.

## Checking network status

```console
$ networkctl
```

Use the interface names shown in the output. Names such as `eth0` and `wlan0` below are examples; yours may differ. For detailed information about a specific interface:

```console
$ networkctl status eth0
```

## Wired networking

A default configuration for wired networking using DHCP is provided out of the box. To configure a static IP address, create `/etc/systemd/network/10-wired.network` with the following content, replacing the interface name and addresses for your network:

```ini
[Match]
Name=eth0

[Network]
Address=192.168.1.100/24
Gateway=192.168.1.1
DNS=192.168.1.1
```

`systemd-networkd` applies the first matching `.network` file in alphanumeric order. The `10-` prefix makes this file take precedence over the usual default files; check for any earlier matching files if it is not selected.

> [!WARNING]
> Applying network changes can disconnect an SSH session. Have local console access or another way to recover before changing the active connection.

Reload the configuration:

```console
$ networkctl reload
```

## Wi-Fi

Wi-Fi is managed through `wpa_supplicant` alongside `systemd-networkd`. The Raspberry Pi images include `wpa_supplicant`.

### Connecting to a network

Create a `wpa_supplicant` configuration for your wireless interface. Replace `MyNetwork` and `wlan0` with your network name and interface name. The second command reads the passphrase from the terminal rather than putting it in shell history:

```console
$ install -m 600 /dev/null /etc/wpa_supplicant/wpa_supplicant-wlan0.conf
$ wpa_passphrase "MyNetwork" >> /etc/wpa_supplicant/wpa_supplicant-wlan0.conf
```

Type the passphrase and press Enter. The output includes the passphrase in a commented `#psk` line; remove that line from the file. Keep the generated `psk` line and restrict access to the file, as it contains credentials. The first command replaces any existing configuration at that path.

Enable and start the `wpa_supplicant` service for your interface:

```console
$ systemctl enable --now wpa_supplicant@wlan0.service
```

Then create `/etc/systemd/network/10-wireless.network` for the wireless interface, replacing `wlan0` with its actual name:

```ini
[Match]
Name=wlan0

[Network]
DHCP=yes
```

Reload networkd to apply the file, then check the connection and the selected network file:

```console
$ networkctl reload
$ networkctl status wlan0
$ systemctl status wpa_supplicant@wlan0.service
```

If a different `.network` file was selected, check for an earlier matching file. If you change the Wi-Fi credentials later, restart `wpa_supplicant@wlan0.service` to load them.

## DNS

DNS is handled by `systemd-resolved`. You can check the current DNS configuration with:

```console
$ resolvectl status
```

For help with problems, see [Troubleshooting on Makalu](/troubleshooting/makalu/basics.md#networking).
