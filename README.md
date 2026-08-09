# GitTracker Frontend

GitTracker is a responsive React application for exploring a GitHub user's profile, repositories, and developer analytics. It consumes the GitTracker Spring Boot API and presents the results in a clean, theme-aware dashboard.

## Features

- Search for a GitHub profile from the home page
- View profile details, follower counts, language insights, and repository previews
- Browse, search, and sort a user's repositories
- Inspect repository metadata, statistics, topics, and README content
- View aggregate developer analytics, including repositories, stars, forks, and most-used language
- Save recent searches in the browser
- Switch between light and dark themes

## Tech Stack

- React 19 and TypeScript
- Vite
- Tailwind CSS 4
- React Router
- Axios
- Lucide React icons

## Prerequisites

- Node.js 20 or later
- npm
- The GitTracker backend running locally (default: `http://localhost:8080`)

The backend uses PostgreSQL and Redis. From the backend project, start its Docker services before launching the API:

```bash
docker compose up -d
./mvnw spring-boot:run
```

On Windows, use `mvnw.cmd spring-boot:run` if needed.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure the API URL in `.env`:

   ```env
   VITE_API_BASE_URL=http://localhost:8080
   ```

   Copy `.env.example` if you need to create the file.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL Vite prints in the terminal, usually `http://localhost:5173`.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server with hot module replacement. |
| `npm run build` | Type-checks the application and creates a production build. |
| `npm run lint` | Runs ESLint across the project. |
| `npm run preview` | Serves the production build locally. |

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Search for a GitHub user. |
| `/profile/:username` | View a profile summary and repository preview. |
| `/profile/:username/repositories` | Browse and filter repositories. |
| `/profile/:username/repositories/:repositoryName` | View repository details and README content. |
| `/profile/:username/analytics` | View developer analytics. |
| `/recent-searches` | Revisit recently searched profiles. |
| `/settings` | Manage display settings, including theme. |

## API Endpoints Used

The frontend expects these endpoints from the backend:

| Endpoint | Purpose |
| --- | --- |
| `GET /api/profile/:username` | Profile summary and analytics. |
| `GET /api/users/:username/repositories` | User repositories. |
| `GET /api/users/:username/repositories/:repositoryName/readme` | Repository README. |
| `GET /api/analytics/:username` | Developer analytics. |

## Project Structure

```text
src/
├── api/          # Axios client configuration
├── components/   # Feature and shared UI components
├── hooks/        # Reusable React hooks
├── layouts/      # Application shell and navigation
├── pages/        # Route-level screens
├── routes/       # Route definitions
├── services/     # Backend API calls
├── types/        # TypeScript models
└── utils/        # Theme and recent-search helpers
```

## Verification

Before opening a pull request, run:

```bash
npm run lint
npm run build
```
