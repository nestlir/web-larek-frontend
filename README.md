# Web Larek — Typed E-commerce Frontend

E-commerce frontend built with TypeScript, modular UI components and an API-driven checkout flow.

## Features

- product catalog;
- product preview;
- shopping basket;
- order and contact forms;
- form validation;
- order submission;
- typed application state;
- API integration.

## Architecture

The project follows a Model–View–Presenter-oriented structure:

```text
src/
├── core/       API, base abstractions and utilities
├── features/   application state and UI features
├── types/      TypeScript contracts
└── common.blocks/ SCSS components
```

This separation keeps domain state, UI rendering and interaction logic distinct.

## Stack

- TypeScript
- HTML5
- SCSS
- Webpack
- REST API
- ESLint
- Prettier

## Run locally

Requirements: Node.js 20+ and npm.

```bash
npm ci
npm run start
```

Create a production build:

```bash
npm run build
```

Run static checks:

```bash
npm run lint
```

## Deployment

The repository includes a GitHub Actions workflow that installs dependencies, creates the production bundle and publishes `dist/` to GitHub Pages after updates to `main`.

## Available scripts

| Command | Description |
|---|---|
| `npm run start` | Start the development server |
| `npm run build` | Create a production build |
| `npm run lint` | Run ESLint |
| `npm run format` | Format source files with Prettier |

## Additional documentation

- `api.yml` — API contract;
- `UML-схема классов.png` — class diagram.

## Project value

The repository demonstrates typed frontend architecture, explicit domain contracts and coordination of multiple connected user flows in a small e-commerce application.
