# Containers on Makalu

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

Podman runs applications packaged as container images. For a long-running
application, a Quadlet file lets systemd manage the container as a service.
The examples here use rootful containers: run the commands as root, as described
in [Basics on Makalu](./basics.md#privilege-escalation).

## Installing Podman

Podman is an optional system extension. If an OS update is waiting for a
reboot, reboot into it first. Then enable, download, and activate the extension:

```console
$ updatectl enable podman --now
$ systemd-sysext refresh
$ podman --version
```

Extensions are enabled automatically on subsequent boots. See
[Applications on Makalu](./applications.md) for more on extensions and updates.
The device needs access to a container registry to download an image; choose an
image that supports your device's architecture.

## Running a container

Run a short-lived container from a fully qualified image name:

```console
$ podman run --rm docker.io/library/alpine:latest echo 'Hello from Podman'
```

Podman downloads the image if needed, runs the command, and removes the container
when it exits. The image remains in local storage. Inspect containers and images
with:

```console
$ podman ps -a
$ podman images
```

## Running a service with Quadlet

Quadlets are intended for hosting services that should keep running and start
with the system, such as web servers or home automation applications. Quadlet
generates systemd services from container definitions, so you can manage them
with the same tools as other services. Create the directory for
administrator-managed Quadlets:

```console
$ mkdir -p /etc/containers/systemd
```

Create `/etc/containers/systemd/example-web.container`:

```ini
[Unit]
Description=Example web server

[Container]
Image=docker.io/library/nginx:alpine
PublishPort=127.0.0.1:8080:80

[Service]
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

This example publishes the container's port 80 on the device's loopback address,
port 8080. After reloading systemd, start and inspect the generated service:

```console
$ systemctl daemon-reload
$ systemctl start example-web.service
$ systemctl status example-web.service
$ journalctl -u example-web.service -b
```

From the device, open `http://127.0.0.1:8080/` to check the web server. The
first start may take time while the image is downloaded. To expose a service to
other machines, choose an appropriate host address and check the network and
firewall configuration.

`WantedBy=multi-user.target` requests startup at boot. Quadlet applies the
`[Install]` section when it generates the service; do not run `systemctl enable`
on the generated service. After changing the `.container` file, reload systemd
and restart the service to apply the changes:

```console
$ systemctl daemon-reload
$ systemctl restart example-web.service
```

To stop it, use `systemctl stop example-web.service`. To remove the example,
stop the service, remove the `.container` file, and reload systemd. Removing the
definition does not remove the downloaded image or any persistent data.

## Persistent data

Container filesystems are disposable. Store application data in a Podman volume
or a host directory outside `/usr`; back up that data separately. Host bind mounts
may need an SELinux label such as `:Z` for private container access. Only relabel
directories intended for the container; do not relabel system directories. See
the [Podman run documentation](https://docs.podman.io/en/latest/markdown/podman-run.1.html)
for mount options and SELinux labeling.

## Updating container images

Updating the Podman extension updates the engine, not the application images.
To update an image manually, pull a suitable new image and restart the Quadlet
service to recreate its container. Image tags can change; use a versioned tag or
digest when you need that type of control.

Podman can also check a registry and update a running Quadlet service
automatically. To opt the example service in, add the following to its
`[Container]` section:

```ini
AutoUpdate=registry
```

This policy requires a fully qualified image name, as used in the example. Reload
systemd and restart the service so the new policy applies:

```console
$ systemctl daemon-reload
$ systemctl restart example-web.service
```

Preview available updates, or run an update immediately:

```console
$ podman auto-update --dry-run
$ podman auto-update
```

To check for updates automatically, enable Podman's system timer:

```console
$ systemctl enable --now podman-auto-update.timer
$ systemctl list-timers podman-auto-update.timer
$ journalctl -u podman-auto-update.service
```

The timer normally runs daily. When the registry image changes, Podman pulls it
and restarts the service, causing a brief interruption. Automatic updates can
introduce incompatible application or data changes, so check the application's
upgrade instructions and maintain backups before enabling them. Podman attempts
to roll back if the service restart fails, but a successful restart does not
guarantee that the application is healthy or undo data changes. See
[podman-auto-update(1)](https://docs.podman.io/en/latest/markdown/podman-auto-update.1.html)
for details.

For more options, including rootless Quadlets, volumes, and networks, see the
[Podman Quadlet guide](https://docs.podman.io/en/latest/markdown/podman-quadlet-basic-usage.7.html)
and [Quadlet reference](https://docs.podman.io/en/latest/markdown/podman-systemd.unit.5.html).
