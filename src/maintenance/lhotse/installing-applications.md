# Installing Applications on Lhotse {#installing-applications}

For the other variant, see [Installing Applications on Makalu](/maintenance/makalu/installing-applications.md).

> [!NOTE]
> This section applies to the [Lhotse](/getting-started/variants.md#lhotse) variant.

The Lhotse variant is package-based and uses `dnf` for package management.

## Searching for packages

```console
$ dnf search htop
```

## Installing a package

```console
$ run0 dnf install htop
```

## Removing a package

```console
$ run0 dnf remove htop
```

## Listing installed packages

```console
$ dnf list --installed
```
