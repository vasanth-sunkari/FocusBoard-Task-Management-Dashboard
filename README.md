# FocusBoard

FocusBoard is a responsive task management dashboard built with React and Vite. It provides a focused workspace for organizing tasks, tracking progress, and reviewing short productivity notes. Task changes are stored in the browser with `localStorage`; no backend or account is required.

## Features

- Create, edit, and delete tasks, with a confirmation before deletion.
- Set a task's status, priority, description, and due date.
- Search task titles and descriptions using case-insensitive partial matching.
- Combine search with status tabs and priority filters.
- View live task totals, in-progress and completed counts, and completion rate.
- Browse the Focus Notes carousel using previous/next controls or its indicators.
- Keep task data between visits using browser `localStorage`.
- Use the dashboard at mobile, tablet, and desktop sizes.

## Technologies

- React
- Vite
- JavaScript (ES modules)
- CSS3, including Grid and Flexbox
- React Hooks (`useState`, `useEffect`, `useMemo`, and `useRef`)
- `localStorage`
- Lucide React

## Project structure

```text
focus-board/
├── index.html
├── package.json
├── package-lock.json
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── App.jsx
    ├── main.jsx
    ├── style.css
    ├── counter.js
    ├── assets/
    │   ├── hero.png
    │   ├── javascript.svg
    │   └── vite.svg
    ├── components/
    │   ├── DashboardHeader.jsx
    │   ├── FocusNotes.jsx
    │   ├── Sidebar.jsx
    │   ├── StatCards.jsx
    │   ├── TaskManager.jsx
    │   ├── TaskModal.jsx
    │   └── WelcomeSection.jsx
    └── data/
        └── tasks.js
```

`counter.js` and the starter assets are present in the repository but are not part of the current dashboard interface.

## Installation

Install [Node.js](https://nodejs.org/) and npm, then open a terminal in the project directory:

```bash
cd focus-board
npm install
```

## Run locally

Start the Vite development server:

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

## Production build

Create an optimized production build:

```bash
npm run build
```

Vite writes the build output to `dist/`. To serve that build locally:

```bash
npm run preview
```

## Responsive design

The dashboard uses responsive CSS layouts for mobile (including 390px), tablet (768px), and desktop (1440px) viewports. The sidebar, task list, and dashboard sections adapt to narrower screens.

## Screenshots

- **Desktop dashboard:** _Add screenshot here._
- **Tablet dashboard:** _Add screenshot here._
- **Mobile dashboard:** _Add screenshot here._

## Deployment

Build the project with `npm run build`, then deploy the generated `dist/` directory to a static hosting provider that supports Vite-built sites.

**Live application:** [Add deployed application URL here]
