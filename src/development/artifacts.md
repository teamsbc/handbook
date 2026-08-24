# Artifacts

TeamSBC publishes built artifacts on [artifacts.teamsbc.net](https://artifacts.teamsbc.net/index.html). These include disk images for all supported devices and variants.

## Structure

Artifacts are organized by branch, Fedora version, and architecture:

```
artifacts.teamsbc.net/
  main/
    latest/
      45/
        aarch64/
        x86_64/
      46/
        aarch64/
        x86_64/
```

## Downloading Artifacts

You can find download links for all supported devices on the [installation](../getting-started/installation.md#supported-devices) page or browse the [artifacts storage](https://artifacts.teamsbc.net/index.html) directly.

## Building Artifacts

Artifact definitions and build instructions live in the [artifacts repository](https://github.com/teamsbc/artifacts). See the [build system](./build-system.md) documentation for how to build them locally.
