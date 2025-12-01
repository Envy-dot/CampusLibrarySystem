# Getting Started by Duru Jesse

To get started, take a look at `src/app/page.tsx`.

## Overview
A minimal Next.js (app router) starter configured to work well with Firebase. Includes example pages/components and a simple development setup so you can iterate quickly.

## Features
- Next.js (app router) + TypeScript-ready structure
- Ready for Firebase Hosting / Cloud Functions integration
- Example entry at `src/app/page.tsx`
- Simple scripts for dev, build, and start

## Prerequisites
- Node.js 16+ (or the version required by your Next.js)
- npm or yarn
- (Optional) Firebase CLI installed: `npm install -g firebase-tools`

## Quick start
1. Install dependencies
    - npm: `npm install`
    - yarn: `yarn`

2. Run in development
    - npm: `npm run dev`
    - yarn: `yarn dev`
    Opens a local dev server with hot reload.

3. Build for production
    - npm: `npm run build`
    - yarn: `yarn build`

4. Start production server (if needed)
    - npm: `npm start`
    - yarn: `yarn start`

## Environment
- Local environment variables can go in `.env.local`. Do not commit secrets.
- If using Firebase services, set your Firebase credentials and project ID in env vars or the Firebase config file.

## Deploying to Firebase
1. Login and initialize (if not done)
    - `firebase login`
    - `firebase init` (choose Hosting or Functions + Hosting)

2. Build and deploy
    - `npm run build`
    - `firebase deploy` (this will deploy your built app per your firebase.json)

Adjust firebase configuration to point at Next.js output or to a server/edge adapter as required by your deployment setup.

## Project structure (common)
- src/
  - app/             — Next.js app routes and pages
  - components/      — UI components
  - styles/          — global and module styles
- public/            — static assets
- package.json       — scripts and dependencies
- firebase.json      — Firebase hosting/functions config (when present)

## Contributing
Open issues or PRs with focused changes. Keep changes small and document any setup or migration steps in the PR description.

## License
Add a LICENSE file to define project licensing.

