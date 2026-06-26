# Packages

TeamSBC layers its own packages on top of Fedora. Package specs are maintained in the [packages repository](https://github.com/teamsbc/packages). Packages are built in GitHub Actions and uploaded to the repositories on merge to `main`.

## Common Packages

The `common` repository contains packages that are used by all TeamSBC variants:

- `teamsbc-release`
- `teamsbc-repos`
- `teamsbc-config`
- `teamsbc-selinux`
