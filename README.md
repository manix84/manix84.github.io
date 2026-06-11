# manix84.github.io

[![Check](https://github.com/manix84/manix84.github.io/actions/workflows/check.yml/badge.svg)](https://github.com/manix84/manix84.github.io/actions/workflows/check.yml)
[![GitHub Pages Release](https://github.com/manix84/manix84.github.io/actions/workflows/ghpages-release.yml/badge.svg)](https://github.com/manix84/manix84.github.io/actions/workflows/ghpages-release.yml)

Personal portfolio and project showcase for [manix84.github.io](https://manix84.github.io). ✨

This site presents professional experience, selected personal projects, screenshots, and examples of front-end focused full-stack engineering work. It is a private promotional website maintained by the repository owner.

## What This Site Covers

- 🧭 Professional profile for Lead/Head Full-Stack Engineering with a front-end focus.
- 🖼️ Project showcase pages with screenshots and concise context.
- 🔗 Social sharing metadata using Open Graph and Twitter cards.
- 🧪 Local and pull request checks for linting, type checking, tests, and dry-run builds.
- 🚀 GitHub Pages deployment from the `main` branch.

## Tech Stack

- React 18
- TypeScript
- Vite
- Sass and CSS Modules
- ESLint
- Vitest
- GitHub Actions
- GitHub Pages

## Getting Started

Install dependencies:

```bash
npm ci
```

Run the local development server:

```bash
npm run dev
```

Run the full local quality gate:

```bash
npm run precommit
```

Build the production site:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Quality Checks

The repository has a local pre-commit workflow and GitHub Actions checks:

- `npm run lint` checks source formatting and lint rules.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm test` runs the Vitest suite.
- `npm run build:dry-run` validates the production build path.

The pull request workflow runs linting, type checks, and tests first. The dry-run build waits for those jobs to complete.

## Versioning

The site version starts at `2.0.0` for the second major version of the portfolio. `npm run prepare` installs a local pre-commit hook that runs `npm run precommit`: quality checks first, then `npm run version:bump`.

The version bump script inspects staged changes and skips automatically when `package.json` already has a manually staged version change for the commit. If the manual bump forgot the lockfile, the hook aligns `package-lock.json` to that staged version.

- **minor** for meaningful site content, structure, component, page, HTML, or public asset changes.
- **patch** for smaller implementation, styling, metadata, script, workflow, config, utility, or test changes.
- **none** for docs-only changes or version-only staged changes.
- **major** only when explicitly requested for a mass change of the site's style and structure.

Override the heuristic when needed:

```bash
SITE_VERSION_BUMP=major git commit
SITE_VERSION_BUMP=minor git commit
SITE_VERSION_BUMP=patch git commit
SITE_VERSION_BUMP=none git commit
```

## Deployment

The GitHub Pages release workflow runs when changes merge into `main`. It builds the Vite app, uploads the generated `dist/` output, and deploys it to GitHub Pages.

## Repository Notes

This is not intended to be an open source collaboration project. The community files are included for clarity, professionalism, and GitHub repository health checks, but external contributions are not expected.

For privacy, support, security, and contribution notes, see:

- [Privacy](./PRIVACY.md)
- [Support](./SUPPORT.md)
- [Security](./SECURITY.md)
- [Contributing](./CONTRIBUTING.md)
- [What's New](./WHATSNEW.md)
