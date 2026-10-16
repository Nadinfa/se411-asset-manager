# AssetTrack — SE411 Project Part 1

AssetTrack is a **React frontend CRUD application** for managing one company asset type: computer assets. It follows the SE411 Part 1 build guide by using Vite, React Router, an in-memory asset collection, React Context, generated documentation, and Vitest/React Testing Library tests.

## Team

> Replace these placeholders before submission.

- Nadin Alaskar — 222410587
- Leena Almosa — 222410578

## Features

- Home dashboard with asset statistics
- Menu visible throughout the application
- Asset list with search and status filtering
- Add new computer assets
- Edit existing computer assets
- Delete assets with confirmation
- Form validation and unique Asset ID validation
- About page with team names and student IDs
- Responsive interface
- Component tests with Vitest + React Testing Library

## Routes

- `/` — Home
- `/assets` — Assets
- `/assets/add` — Add Asset
- `/assets/edit/:id` — Edit Asset
- `/about` — About

## Part 1 Data Storage

There is **no database in Part 1**. The initial data is defined in `src/data/assets.js` and the working asset collection is stored in React state through `src/context/AssetContext.jsx`.

## Technology Stack

- React.js
- React Router DOM
- React Context API
- JavaScript
- HTML/CSS
- Vite
- Vitest
- React Testing Library
- jsdom
- Git/GitHub

## Project Structure

```text
se411-asset-manager/
├── docs/
│   ├── architecture.md
│   └── requirements.md
├── src/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── test/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Run the Project

Use Node.js LTS. In the project folder:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Run Tests

```bash
npm test
```

## Production Build

```bash
npm run build
```

## Documentation

- `docs/requirements.md` — field list, functional requirements, CRUD user stories, page outline, and non-functional requirements
- `docs/architecture.md` — architecture, component tree, state management, technology stack, features, and testing

## Before Submission

1. Replace the placeholder team names/student IDs in both `src/components/About.jsx` and this README.
2. Run `npm install`.
3. Run `npm test` and confirm all tests pass.
4. Run `npm run build` and confirm the production build succeeds.
5. Create one public GitHub repository for the team.
6. Commit and push this complete frontend project.
7. Submit the public GitHub repository URL as required.

## Suggested Git Commands

```bash
git init
git add .
git commit -m "Complete SE411 Part 1 React asset manager"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
