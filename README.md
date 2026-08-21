# Web Larek — Typed E-commerce Frontend

> E-commerce interface built around MVP architecture, typed domain models and API-driven user flows.

## Overview

Web Larek is a product catalog and checkout experience. The frontend separates data, presentation and interaction through a Model–View–Presenter architecture and communicates with a backend API.

## What I demonstrated

- TypeScript domain modeling and strict interfaces;
- Model–View–Presenter architecture;
- API abstraction and asynchronous data loading;
- reusable UI components;
- form validation and checkout flow;
- basket and order state management;
- modular SCSS architecture;
- Webpack-based build pipeline.

## Architecture

**Model** handles application data and API communication. **View** renders the interface and user interactions. **Presenter** coordinates state changes and connects the two layers.

The architecture is intentionally explicit: business/data logic is separated from DOM concerns, making the application easier to reason about and extend.

## Stack

**TypeScript · HTML5 · SCSS · Webpack · REST API · MVP**

## Run locally

```bash
npm install
npm run start
```

Production build:

```bash
npm run build
```

## Why this project matters

This case demonstrates a step beyond visual frontend work: designing a small application architecture, maintaining typed contracts and coordinating several connected user flows.

## Context

Originally created during frontend training; presented here as an architecture-focused e-commerce case study.
