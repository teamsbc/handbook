# Testing

Testing has two parts: checking the tools that build and publish TeamSBC, and checking the resulting operating system on a running machine. Some repository tools already have automated tests. Booting images and exercising system behavior still requires manual testing; the artifact workflow builds images but does not include a boot-test job.

Choose checks that exercise the behavior you changed. A package can build successfully but install the wrong files, and a disk image can build successfully but fail during boot or provisioning. Record what you tested so another person can understand both the result and its limits.

## Manual Testing

The [virtual machine images](../getting-started/installation.md#virtual-machine) are a useful starting point for changes that do not depend on board-specific hardware. Boot a fresh image in a virtual machine with UEFI firmware and use its console to observe setup and any errors. Follow the [installation](../getting-started/installation.md) and [provisioning](../getting-started/provisioning.md) chapters for the expected setup flow.

For a basic image check, confirm that first-boot provisioning completes, the system reaches a login prompt, and the configured credentials let you log in. Then exercise the affected services or configuration. For example, a network change needs a working connection, while a user-management change needs an account that can be created and used.

Reboot after changes that affect boot files, service startup, or persistent configuration. Checking a command once on a running system does not establish that its changes survive a reboot.

## Provisioning and Disk Layout

When changing initial setup, test both interactive first-boot provisioning and the offline route when the change affects both. Record the version of the host's `systemd` tooling for offline provisioning, since the host modifies the image and its behavior can differ from the tools inside TeamSBC.

Check whether credentials and configuration have the intended SELinux labels and whether setup completes after any required relabeling. The [provisioning chapter](../getting-started/provisioning.md#auto-relabeling) explains the relabel marker used with older host tooling.

Disk-layout changes should be exercised on storage matching the image's size and on a larger destination. This helps reveal problems with partition creation, discovery, and filesystem growth. For Makalu, also inspect the populated `/usr` partition and the empty update slot, and ensure the layout agrees with the `repart.d` files shipped by `teamsbc-config`.

## Package and Update Changes

For package changes, inspect the built RPM's contents and test installation in a matching environment. When an upgrade can encounter existing files or configuration, test that route as well as a fresh installation. Check dependencies, scriptlets, service behavior, and any SELinux denials relevant to the change.

For Lhotse, exercise the package update or application-management path you changed. For Makalu update work, keep the `/usr` payload and UKI on the same image version and test the transition to the new version, including a reboot. Check that the source filenames, transfer patterns, partition labels, and boot entries agree.

System extension changes need a compatible base image. The current extension build uses the image's identity and version, so record both when testing that the extension can be used and its application runs.

## Hardware Testing

Virtual machines cannot establish that a board's firmware, boot files, storage interfaces, or wireless hardware work. Changes to Raspberry Pi platform definitions or U-Boot packages need testing on the affected physical board.

Include the board model, architecture, boot medium, and relevant peripherals in your notes. If a change affects several boards or architectures, state which combinations you tested and which still need coverage.

## Automated Repository Tests

### Package Repository Helpers

The packages repository contains Python tests for package selection, metadata fetching, and repository merging. From the root of that checkout, run:

```console
$ python3 -m unittest discover -s .github/scripts/tests -v
```

Metadata merge tests require `createrepo_c`, `mergerepo_c`, and the `python3-createrepo_c` bindings. Those tests are skipped when their dependencies are missing, so look at the test output before treating a run as complete coverage of the merge behavior.

The fixtures exercise cases such as multiple unpublished commits, missing baselines, shared input changes, and older workflow reruns. These tests help check the publishing logic without changing a live package repository.

### Directory Listing Tool

The `s3-directory-listing` repository has Go tests for directory handling, checksum generation, and template rendering. From its root, run:

```console
$ make test
$ make vet
```

The test target runs Go's tests with the race detector; the vet target runs `go vet`. The repository's CI also builds the code and checks formatting and other static checks. For changes to publication or cleanup logic, use fixtures representing stored objects rather than experimenting against published downloads.

## Sharing Results

A useful test report identifies the source change, image filename or version, architecture, device or virtual machine, and steps performed. Include what you expected, what happened, and relevant logs. For build or provisioning failures, include the host tools and build method as well.

Report problems through the [distribution issue tracker](https://github.com/teamsbc/distribution/issues). If you would like to improve test coverage, automate image boot tests, or help test on hardware, [join the community](../preface/community.md) and share what you can work on.
