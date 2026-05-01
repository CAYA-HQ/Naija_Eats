# NaijaEats 🍲

NaijaEats is a modern web application designed to eliminate "meal decision paralysis" for lovers of Nigerian cuisine. It provides users with personalized weekly meal plans, budget summaries, and automated shopping lists (Market) to make cooking stress-free and efficient.

## 🚀 Project Overview

NaijaEats solves the daily question of "What should I cook?" by leveraging user preferences and dietary requirements to curate a perfect weekly menu. Whether you're a student on a budget or a busy professional, NaijaEats helps you plan your meals and shop for ingredients with ease.

### Key Features

- **Personalized Onboarding**: Tailors meal suggestions based on cooking frequency and food preferences.
- **Dynamic Weekly Plans**: A full 7-day meal schedule with automated budget estimations.
- **Smart Market List**: A categorized shopping list that syncs with your weekly plan to ensure you never miss an ingredient.
<!-- - **Premium UI/UX**: A beautiful, responsive interface built with modern web standards. -->

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Icons**: [Iconify(Custom SVG component library)](https://icon-sets.iconify.design/)

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or higher
- **npm**: Version 9.x or higher

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CAYA-HQ/Naija_Eats.git
   cd Naija_Eats/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## Project Structure

```text
src/
├── components/     # Reusable UI components (Header, Layouts, Custom Checkboxes)
├── constants/      # Static data and Icon library (icons.jsx, market.jsx)
├── onboarding/     # Onboarding flow screens (Preferences, Frequency)
├── pages/          # Main application pages (WeeklyPlan, Market, Auth)
├── App.jsx         # Main routing and entry point
└── globals.css     # Tailwind 4 configuration and global styles
```

---

## How to Contribute

Follow these steps to get started:

1. **Fork the Repository**: Create your own copy of the project.
2. **Create a Branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make Your Changes**: Ensure your code follows our standards.
4. **Commit Your Changes**: Use descriptive commit messages.
   ```bash
   git commit -m "feat: add support for dietary restrictions",
   git commit -m "fix: fixed next plan button border",
   git commit -m "fix: fixed button",
   ```
5. **Push to Your Fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request**: Submit your changes for review.

---

## Development Workflow

### Coding Standards

- **Naming Conventions**: Use `PascalCase` for components and `camelCase` for variables and functions.
- **Typography**: Use the `font-display` (Playfair Display) for headings and `font-inter` (Inter) for body text.
- **Immutability**: Always update state immutably using `.map()`, `[...]`, or `{...}`.

### Linting & Formatting

The project uses ESLint. Ensure your code passes linting before submitting a PR:

```bash
npm run lint
```

---

## Common Tasks

- **Adding a New Icon**: Add the SVG component to `src/constants/icons.jsx`.
- **Updating Market Data**: Modify the `MarketData` function in `src/constants/market.jsx`.
- **Creating a New Route**: Add the component to `src/pages` and register the route in `App.jsx`.

---

## Troubleshooting

- **JSX Error in .js files**: Ensure all files containing JSX use the `.jsx` extension.
- **Tailwind Styles Not Applying**: Check `globals.css` to ensure `@import "tailwindcss";` is present and `@theme` variables are correctly defined.
- **Navigation Issues**: Ensure you are using the `useNavigate` hook for programmatic navigation rather than the `<Navigate />` component inside event handlers.

---

## License

© 2026 NaijaEats. All rights reserved.
