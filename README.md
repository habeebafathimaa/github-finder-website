# GitHub Finder

A responsive React app for discovering public GitHub profiles and exploring their recent repositories. It uses GitHub's public REST API directly from the browser—no account or API key is required. The visual direction pairs a dark editorial canvas with warm cream type and restrained burgundy accents.

## Requirements

- Node.js 20.19+ (or 22.12+)
- npm 10+
- An internet connection for live GitHub data

## Run in VS Code

1. Download and extract the ZIP, then open the **`github-finder`** folder in VS Code (`File → Open Folder`).
2. Open the integrated terminal in that folder.
3. Install dependencies with `npm install`.
4. Start the development server with `npm run dev`.
5. Open the local URL printed by Vite (normally `http://localhost:3000`).

Useful project scripts:

```bash
npm run dev       # start the Vite development server
npm run lint      # run ESLint
npm run build     # create the production bundle in dist/
npm run preview   # serve the built app locally
```

## How to use it

Enter a GitHub username (or paste its profile URL) to open that profile. To search by a person's display name or another phrase, submit the name to see matching GitHub accounts and choose the right one. Profile pages show the live avatar, display name, handle, bio, location, company, follower/following counts, public repository count, join date, and up to six recently updated public repositories. Each account/repository link opens GitHub in a new tab.

The app displays loading, invalid-input, no-match, network, GitHub API and rate-limit states. GitHub's unauthenticated API allows a limited number of requests; wait for the reset period if its limit is reached. Do not put a personal access token in this client-only student app.

## React concepts demonstrated

- **Hooks:** `useState` and `useEffect` power form state, recent searches, route data loading, and safe request cleanup with `AbortController`.
- **Routing:** React Router serves the home page (`/`), matching users (`/search?q=...`), profile detail (`/profile/:username`), About (`/about`), and a custom not-found page.
- **API integration:** `src/services/githubApi.js` centralizes Fetch requests, validation, GitHub error handling, name search, and profile/repository loading.
- **Responsive UI:** CSS Grid/Flexbox layouts collapse intentionally on mobile; focus states and reduced-motion preferences are supported.

## Project structure

```text
github-finder/
├── public/
│   ├── app-icon.png
│   ├── favicon.svg
│   └── manus-routes.json
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── FeedbackState.jsx
│   │   ├── Navbar.jsx
│   │   ├── ProfileAvatar.jsx
│   │   ├── ProfileSearchForm.jsx
│   │   ├── RepositoryCard.jsx
│   │   └── SiteFooter.jsx
│   ├── hooks/
│   │   └── useRecentSearches.js
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Home.jsx
│   │   ├── NotFound.jsx
│   │   ├── Profile.jsx
│   │   └── SearchResults.jsx
│   ├── services/
│   │   └── githubApi.js
│   ├── utils/
│   │   └── format.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── app.config.ts
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
└── vite.config.js
```
