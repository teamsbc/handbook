# Infrastructure

TeamSBC's infrastructure connects source repositories, build environments, and public download storage. Package builds produce the repositories consumed by image builds; image builds then publish installation images, update payloads, and system extensions.

This chapter gives an overview of those connections. See [packages](./packages.md), [artifacts](./artifacts.md), and the [build system](./build-system.md) for the details of individual outputs and builds.

## Source Repositories

The project is split across repositories with different responsibilities:

| Repository | Responsibility |
| --- | --- |
| [distribution](https://github.com/teamsbc/distribution) | Central issue tracker and project history in `NEWS.md` |
| [packages](https://github.com/teamsbc/packages) | RPM specs, package sources, and package repository publication |
| [artifacts](https://github.com/teamsbc/artifacts) | Image definitions, local build helpers, and image publication |
| [containers](https://github.com/teamsbc/containers) | Definitions and workflows for TeamSBC's CI container images |
| [s3-directory-listing](https://github.com/teamsbc/s3-directory-listing) | Tool that generates download directory indexes and aggregate checksums |
| [s3-directory-listing-template](https://github.com/teamsbc/s3-directory-listing-template) | Shared HTML template for download indexes |
| [handbook](https://github.com/teamsbc/handbook) | This documentation and its site configuration |
| [website](https://github.com/teamsbc/website) | Project homepage |

Issues are tracked in the distribution repository even when the implementation belongs elsewhere. If you are investigating a problem, use that tracker for the report and follow the relevant source repository for the code or configuration.

## Domains

TeamSBC largely uses two separate domains to serve content. `teamsbc.org` and its subdomains serve text content such as the homepage and handbook. `teamsbc.net` and its subdomains serve packages, disk images, and other binary outputs.

| Domain | Content |
| --- | --- |
| [teamsbc.org](https://teamsbc.org/) | Project homepage |
| [handbook.teamsbc.org](https://handbook.teamsbc.org/) | User and developer documentation |
| [packages.teamsbc.net](https://packages.teamsbc.net/index.html) | RPM repositories and the package signing public key |
| [artifacts.teamsbc.net](https://artifacts.teamsbc.net/index.html) | Installation disk images |
| [updates.teamsbc.net](https://updates.teamsbc.net/index.html) | Makalu update payloads |
| [extensions.teamsbc.net](https://extensions.teamsbc.net/index.html) | System extensions built alongside images |

## Build Environments

GitHub Actions runs the package and artifact workflows. The package workflow uses `ghcr.io/teamsbc/ci-packages`, with Fedora-version tags, and builds on runners matching the target architecture. The container supplies RPM build, signing, and repository-generation tools.

Image builds use the upstream `ghcr.io/osbuild/image-builder:latest` container with TeamSBC's definitions mounted into it. The containers repository also maintains a `ci-artifacts` image.

The CI container workflows publish multi-architecture images for `amd64` and `arm64`. They run on relevant source changes, manual requests, and a daily schedule. Container refreshes and distribution builds have separate triggers; publishing a container does not by itself mean that a new disk image was built.

## Build Triggers and Dependencies

Package builds run on relevant pushes to `main` or manual requests. Artifact builds also run daily. On scheduled artifact runs, the workflow generates a manifest and compares its fetched sources with the most recent published manifest for that image type. It skips building and publishing when those sources match. Push-triggered and manual artifact runs build unconditionally.

The artifact repository's build-time repository definitions point to Fedora and TeamSBC package repositories. Changes published by the package workflow can therefore become inputs to a later image build. The package and artifact workflows operate independently rather than as one combined pipeline.

## Storage and Directory Indexes

Published binary files are stored in Cloudflare R2 buckets. Workflows upload through its S3-compatible API, and the public domains provide access to the resulting files.

The `s3-directory-listing` tool reads the bucket contents and renders HTML directory listings using the shared template. The packages and artifacts repositories include that template as the `s3-index-template` submodule. For image-related buckets, index generation also assembles aggregate checksum files, which the workflow signs before upload.

File publication and index generation are separate steps. When troubleshooting missing downloads, distinguish a build failure, an upload failure, and an index that has not yet been regenerated. The build and index workflow definitions show which stage owns each operation.

## Handbook Hosting

The handbook uses VitePress. Its GitHub Actions workflow builds the site for pushes to `main` and pull requests, and deploys successful `main` push builds to GitHub Pages. Chapters live in `src/`, while `.vitepress/config.js` defines navigation and site settings.

For local documentation work, see the [handbook README](https://github.com/teamsbc/handbook/blob/main/README.md). Changes to a chapter belong in its Markdown source; rendered site files are generated by the build.
