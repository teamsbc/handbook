# Networking

TeamSBC uses `systemd-networkd` for network configuration instead of `NetworkManager`. Network configuration files are placed in `/etc/systemd/network/`.

## Checking network status

```console
$ networkctl
```

For detailed information about a specific interface:

```console
$ networkctl status eth0
```

## Wired networking

A default configuration for wired networking using DHCP is provided out of the box. To configure a static IP address create a `.network` file in `/etc/systemd/network/`:

```ini
[Match]
Name=eth0

[Network]
Address=192.168.1.100/24
Gateway=192.168.1.1
DNS=192.168.1.1
```

After creating or modifying network configuration files restart `systemd-networkd`:

```console
$ run0 systemctl restart systemd-networkd.service
```

## Wi-Fi

Wi-Fi is managed through `wpa_supplicant` alongside `systemd-networkd`.

### Connecting to a network

Create a `wpa_supplicant` configuration for your wireless interface:

```console
$ run0 wpa_passphrase "MyNetwork" "MyPassword" > /etc/wpa_supplicant/wpa_supplicant-wlan0.conf
```

Enable and start the `wpa_supplicant` service for your interface:

```console
$ run0 systemctl enable --now wpa_supplicant@wlan0.service
```

Then create a `.network` file in `/etc/systemd/network/` for the wireless interface:

```ini
[Match]
Name=wlan0

[Network]
DHCP=yes
```

## DNS

DNS is handled by `systemd-resolved`. You can check the current DNS configuration with:

```console
$ resolvectl status
```
