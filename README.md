# Disney Plus Clone

This is a Disney Plus / Disney Hotstar clone built using **Next.js** and **TheMovieDB API**, designed with a focus on **performance, SEO, and scalability**. The project is optimized to support millions of users and adheres to best practices for **Core Web Vitals (CWV)**.

## Features

- **Server-Side Rendering (SSR) & Static Site Generation (SSG)** for optimal performance and SEO.
- **Custom Hooks with Axios** for efficient API data fetching.
- **Fully Typed with TypeScript** for better maintainability and scalability.
- **State Management** handled using React Context and Local Storage (for watchlist).
- **No UI Libraries** to maintain full control over styling and performance.
- **Navigation & Sidebar UI** designed for smooth user experience.
- **High-performance metrics** based on CWV.

## Technical Decisions & Explanations

1. **Next.js with SSR & SSG**
   - Used SSR for dynamic pages (e.g., Movie/TV detail pages) to ensure fresh data and improve SEO.
   - Used SSG for static pages like homepage and search results to improve performance.

2. **Axios in Custom Hooks**
   - Created reusable hooks for API requests (`useFetchMovies`, `useFetchTVShows`, etc.).
   - Helps separate business logic from UI components.
   
3. **Strong TypeScript Typing**
   - Ensures type safety for API responses and state management.
   - Reduces runtime errors and improves developer experience.

4. **State Management with Context API & Local Storage**
   - Used Context API for global state management (e.g., auth, theme settings).
   - Watchlist is stored in `localStorage` to persist user data across sessions.

5. **Avoiding UI Libraries**
   - All components are built from scratch using CSS for full control over styles.
   - Ensures performance and reduces unnecessary dependencies.

## How to Run the Project

### Prerequisites
- Node.js (>= 18.x)
- npm

### Installation
```sh
# Clone the repository
git clone https://github.com/ChristopherRolando8/disney-plus-clone.git
cd disney-plus-clone

# Install dependencies
npm install
```

### Environment Variables
Create a `.env.local` file in the root directory and add:
```sh
NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key
NEXT_PUBLIC_TMDB_IMG_URL=https://image.tmdb.org/t/p
NEXT_PUBLIC_SITE_URL=your_domain_url
```
Replace `your_tmdb_api_key` with your actual API key from [TheMovieDB](https://www.themoviedb.org/).

### Running the Development Server
```sh
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production
```sh
npm run build
npm start
```

### Tests
```sh
npm run test
```
## Libraries
- `clsx` – Efficiently combines class names for components.
- `dayjs` – Lightweight library for fast date and time manipulation.
- `lodash/memoize` – Enhances performance by memoizing Redux selectors.
- `next-redux-wrapper` – Simplifies Redux integration with Next.js, particularly for SSR.
- `next-sitemap` – Automates sitemap and robots.txt generation, including server-side sitemaps.
- `nextjs-progressbar` – Improves user experience by displaying a loading indicator during page transitions.
- `@testing-library`, jest – Ensures component reliability through unit testing.
- `husky, eslint, lint-staged` – Automates code quality checks via pre-commit hooks.

## License
This project is open-source under the MIT License.

