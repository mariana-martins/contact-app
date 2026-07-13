# 📖 Contact App

Welcome to the **Contact App**! A modern, responsive, highly accessible contact management web application built with **React 19**, **Tailwind CSS v4**, **Radix Primitives**, and **Vite 7**.

Designed from the ground up with **WCAG 2.2 AA/AAA Accessibility** standards and responsive UI/UX best practices, Contact App makes managing your address book effortless, fast, and delightful across desktop and mobile devices.

---

## ✨ Features

- **WCAG 2.2 Accessible UI**: Built with semantic HTML5 (`<main>`, `<section>`, `<footer>`, structured `<table>` with `<th scope="col">`), proper ARIA labeling (`aria-invalid`, `aria-describedby`, `aria-pressed`), and explicit keyboard focus states (`focus-visible`).
- **Radix Primitives & Lucide Icons**: Utilizes WAI-ARIA compliant **Radix AlertDialog** for destructive confirmation modals (with automatic focus trapping and restoration) and **Radix Toast** (`role="status"`, `aria-live="polite"`) paired with tree-shakeable **Lucide React** icons.
- **Add & Edit Contacts**: Easily create new contacts or update existing details (Name, Email, Telephone) with real-time field validation and error messaging.
- **Favorites & Instant Filtering**: Toggle contacts as favorites with a single click and filter your list to view either **All** contacts or **My Favorites**.
- **Responsive Layout Strategy**: Seamlessly transforms between an interactive data table on desktop/tablet viewports and a clean card list view on mobile screens.
- **Persistent Local Storage**: Automatically saves and restores your address book state using browser `localStorage`.

---

## 🛠 Tech Stack

- **React 19**: Modern React with functional components and hooks.
- **Tailwind CSS v4**: CSS-first utility styling powered by the native `@tailwindcss/vite` plugin and custom `@theme` design tokens.
- **Radix UI Primitives** (`@radix-ui/react-alert-dialog`, `@radix-ui/react-toast`): Unstyled, fully accessible interactive primitives.
- **Lucide React**: Clean, modern SVG icons.
- **React Router v7**: Client-side routing (`createBrowserRouter` & `RouterProvider`).
- **Vite 7**: Ultra-fast development server and optimized production bundler.
- **Vitest 4**: Lightning-fast unit testing framework running in `jsdom`.
- **ESLint 10 & Prettier**: Automated code quality rules and formatting.
- **Husky & lint-staged**: Git hooks protecting commits with automated linting, formatting, and unit tests.

---

## 📐 Architecture & Accessibility Highlights

1. **Design System & Aesthetics**:
   - Uses Tailwind CSS v4 `@theme` tokens for a curated indigo palette (`--color-primary-*`), smooth visual transitions, and high-contrast typography (`text-slate-900` on light backgrounds exceeding WCAG AAA 14:1 contrast ratios).
2. **Accessible Form Handling**:
   - Every form input is associated with an explicit `<label>`, uses `aria-invalid` and `aria-describedby` when errors occur, and provides clear contextual feedback.
3. **Destructive Action Safety**:
   - Deleting a contact triggers an explicit confirmation modal via Radix `AlertDialog` that traps focus, supports `Escape` key dismissal, and prevents accidental overlay clicks from dismissing critical alerts.

---

## 🚀 Getting Started

Follow these instructions to set up, test, and run the application locally.

### Prerequisites

Ensure you have **Node.js 18+** installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/mariana-martins/contact-app.git
   cd contact-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### 🏃‍♂️ Running the Development Server

Launch the Vite dev server:
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Changes hot-reload instantly.

---

## 🧪 Testing & Verification

The project includes a comprehensive Vitest test suite covering utilities, storage persistence, and all UI components:

```bash
# Run all tests once
npm test

# Run tests in watch mode
npm run test:watch
```

---

## 📦 Building for Production

Compile an optimized production bundle:
```bash
npm run build
```
Assets are generated in the `dist` folder.

To preview the production build locally:
```bash
npm run preview
```

---

## ✅ Linting & Formatting

Check code quality and format files automatically:
```bash
# Check for lint errors
npm run lint

# Auto-format codebase
npm run format
```

---

## 💡 Pro Tip: Populate Sample Data

Want to test the application immediately without manually adding contacts?

1. Open the app in your browser at `http://localhost:3000`.
2. Open your browser's **Developer Tools Console** (`F12` or `Cmd+Option+I`).
3. Run the following helper command:
   ```javascript
   populateTestData();
   ```
4. Refresh the page to load 7 ready-to-use sample contacts!
