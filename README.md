# NaijaEats

NaijaEats is a premium meal planning and grocery automation platform designed specifically for Nigerian cuisine. It empowers users to discover heritage-inspired recipes, generate personalized weekly meal plans, and automate their market shopping lists based on real budget constraints.

---

## 🏗 Repository Structure

This is a monorepo containing both the frontend and backend services.

- **`/frontend`**: React 19 web application built with Vite and Tailwind CSS 4.
- **`/backend`**: Fast API service built with Bun and TypeScript.

---

## Tech Stack

### Frontend

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: React Context & Hooks
- **Routing**: [React Router 7](https://reactrouter.com/)

### Backend

- **Runtime**: [Bun](https://bun.sh/)
- **Language**: TypeScript
- **Database**: (Specify if known, e.g., PostgreSQL/Prisma)

---

## Getting Started

To get the entire project running locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Bun](https://bun.sh/) (for backend services)
- [Git](https://git-scm.com/)

### Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/CAYA-HQ/Naija_Eats.git
   cd Naija_Eats
   ```

2. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   _Frontend will be live at `http://localhost:5173`_

3. **Setup Backend**
   ```bash
   cd ../backend
   bun install
   bun run dev
   ```
   _Backend API will be live at `http://localhost:3000`_

---

## Contribution Guidelines

We are a team of developers working together. Please follow these standards to keep the codebase clean:

### Branching Strategy

- `main`: Production-ready code.
- `develop`: Integration branch for features.
- `feat/feature-name`: New features.
- `fix/bug-name`: Bug fixes.

### Workflow

1. Pull the latest changes from `develop`.
2. Create a descriptive branch: `git checkout -b feat/user-auth`.
3. Commit with clear messages: `feat: implement google social login`.
4. Push and open a Pull Request (PR) against `develop`.

### Coding Standards

- **Naming**: `PascalCase` for React components, `camelCase` for variables/functions.
- **Consistency**: Use the established `Button` and `Icon` components in the frontend.
- **Performance**: Use `.webp` for all images to ensure fast load times.

---

## Documentation

- [Frontend README](./frontend/README.md) - Detailed frontend setup and architecture.
- [Backend README](./backend/README.md) - API endpoints and database schema.

---

## License

© 2026 NaijaEats. All rights reserved.
