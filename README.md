> [!IMPORTANT]
> Issues for this repository are tracked at the [distribution bug tracker](https://github.com/teamsbc/distribution/issues).

# TeamSBC Handbook

The handbook uses [VitePress](https://vitepress.dev/) with its default theme.
Use Node.js 22 or newer. If you use nvm, run `nvm use` first.
`package.json` overrides VitePress 1.x's Vite dependency with a patched Vite 6
release to avoid the advisories affecting Vite 5.

Install dependencies and start the development server:

```sh
npm ci
npm run docs:dev
```

Build and preview the production site:

```sh
npm run docs:build
npm run docs:preview
```

Chapters live in `src/`. Navigation and site settings live in
`.vitepress/config.js`, and shared images live in `src/public/`.
The homepage is `src/index.md`; `src/handbook/index.md` includes it to preserve
the former chapter URL.

Maintenance chapters are grouped by variant in `src/maintenance/lhotse/` and
`src/maintenance/makalu/`. The original `src/maintenance/*.md` paths include the
Lhotse pages to keep existing links working and are excluded from search.

GitHub Actions builds the site and deploys `.vitepress/dist/` to GitHub Pages
on pushes to `main`. The workflow uses the base path supplied by GitHub Pages.
For a local build at a subpath, use `VITEPRESS_BASE=/handbook/ npm run docs:build`.
