# Build System

TeamSBC uses [image-builder](https://osbuild.org/docs/developer-guide/projects/image-builder/) to produce disk images. Image definitions are maintained in the [artifacts repository](https://github.com/teamsbc/artifacts). Artifacts are also built there through GitHub Actions.

## Building Locally

You can build artifacts locally using the provided `Makefile` in the [artifacts repository](https://github.com/teamsbc/artifacts).

Since TeamSBC often uses the latest features of `image-builder` there is a chance that they might not yet be in a released version. The default suggestion is to build with the upstream container:

```console
$ make build-in-container VERSION=46 TYPE=lhotse-virt
```

If you don't or can't use containers you can replace `build-in-container` with `build` and your locally installed `image-builder` will be used. In that case make sure you have `image-builder` installed:

```console
$ run0 dnf install image-builder
```
