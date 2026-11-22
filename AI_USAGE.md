# AI Usage Disclosure

## AI tool used

GitHub Copilot was used as an AI coding assistant during development of the FocusBoard Task Management Dashboard.

## How AI assisted

Copilot assisted with:

- Creating and organizing reusable React components for the dashboard.
- Developing the dashboard's CSS styling and responsive layouts.
- Implementing task operations, search, filters, statistics, and local browser storage.
- Reviewing the implementation against the assignment requirements, identifying gaps, and making targeted fixes.
- Running browser checks and the Vite production build during this development session.

## Representative prompts

Examples of development requests in this session included:

1. “Create a modern, clean, premium-looking dashboard” with a sidebar, task statistics, Focus Notes, and task management.
2. “Review my existing FocusBoard React + Vite project against the assignment requirements.”
3. “Then fix only the missing or broken functionality. Preserve the current component structure and visual design.”
4. “Create a professional README.md for my FocusBoard Task Management Dashboard project” based on the actual repository files.

## AI assistance and review

The React components, styling, task functionality, responsive rules, and documentation described above were produced or modified with AI assistance. The user supplied the requirements and requested an implementation review. The development conversation records browser checks run by Copilot for persistence, filtering, task updates, validation, delete confirmation, keyboard behavior, and responsive layouts, as well as a successful `npm run build`.

This session does not establish that the user independently reviewed the generated code or personally ran those checks. No independent manual verification by the user is claimed here.

## Example of a suggestion checked and corrected

An initial dependency-install command ran from the workspace root rather than the `focus-board` app directory. Inspection showed that the Vite package scripts belong to `focus-board`; the install was rerun in that directory, the accidentally generated root-level npm files were removed, and the FocusBoard production build was then run successfully.

## Assignment verification

During the Copilot-assisted review, all 10 assignment requirements were checked against the application, including localStorage persistence, initial sample data, search and combined filters, dynamic statistics, task CRUD and status updates, form validation, delete confirmation, responsive layouts, and keyboard accessibility with form labels. The final `npm run build` completed successfully. Vite emitted non-blocking Lucide React module-directive warnings during the build.
