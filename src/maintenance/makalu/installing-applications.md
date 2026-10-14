# Installing Applications on Makalu

For the other variant, see [Installing Applications on Lhotse](/maintenance/lhotse/installing-applications.md).

> [!NOTE]
> This section applies to the [Makalu](/getting-started/variants.md#makalu) variant.

## Searching for system extensions

```console
$ updatectl features
  FEATURE DESCRIPTION              
✗ tmux[🡕] tmux terminal multiplexer
```

## Installing a system extension

```console
$ updatectl enable tmux --now
host@46.20261014.0: ✓ Done
Feature(s) downloaded.
$ systemd-sysext merge
Using extensions 'tmux_46.20261014.0.sysext.raw'.
Merged extensions into '/usr'.
```

## Removing a system extension

```console
$ updatectl disable tmux 
$ rm /var/lib/extensions/tmux_*
$ systemd-sysext refresh
No extensions found.
Unmerged '/usr'.
```

## Listing installed system extension

A checkbox means the extension is installed.

```console
# updatectl features
  FEATURE DESCRIPTION              
✓ tmux[🡕] tmux terminal multiplexer
```
