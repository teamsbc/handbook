# Applications on Lhotse {#applications}

> [!NOTE]
> <span id="installing-applications"></span>This section applies to the [Lhotse](/getting-started/variants.md#lhotse) variant.
> For the other variant, see [Applications on Makalu](/maintenance/makalu/applications.md).

The Lhotse variant is package-based and uses `dnf` for package management.

## Searching for packages

```console
$ dnf search htop
```

## Installing a package

```console
$ dnf install htop
```

## Removing a package

```console
$ dnf remove htop
```

## Listing installed packages

```console
$ dnf list --installed
```

For help with problems, see [Troubleshooting on Lhotse](/troubleshooting/lhotse/basics.md#package-and-update-failures).
