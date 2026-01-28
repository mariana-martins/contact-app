[![Netlify Status](https://api.netlify.com/api/v1/badges/6b7b76e7-6619-4ad4-a3f5-bc9e6b98efaa/deploy-status)](https://app.netlify.com/sites/mariana-contact-app/deploys)

# 📖 Contact App

Welcome to the **Contact App**! This is a modern, responsive, and persistent contact management website built with **React 18** and **Material UI (MUI 5)**.

It allows you to manage your address book with ease, letting you add, edit, delete, and favorite contacts. Your data is persisted automatically using the browser's `localStorage`, so you won't lose your contacts even if you refresh the page!

## ✨ Features

- **Add & Edit Contacts**: Easily create new contacts or update existing details (Name, Email, Telephone).
- **Favorites**: Mark your besties as favorites and filter the list to see only them.
- **Persistent Storage**: All data is saved locally in your browser.
- **Responsive Design**: Looks great on desktop and mobile devices.
- **Validation**: Ensures valid email formats and required fields.

## 🛠 Tech Stack

- **React 18**: Utilizing the latest Concurrent features and Hooks.
- **Material UI (v5)**: For a beautiful and accessible component library.
- **React Router (v6)**: For seamless client-side navigation.
- **LocalStorage**: For simple and effective data persistence.

## 🚀 Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have **Node.js** installed.

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/mariana-martins/contact-app.git
    cd contact-app
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    _(Note: We use `npm` for this project.)_

### 🏃‍♂️ Running the App

In the project directory, run:

```bash
npm start
```

This will launch the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The page will reload if you make edits.

### 🧪 Testing

This project comes with a suite of tests to ensure everything works as expected. To run them:

```bash
npm test
```

This launches the test runner in interactive watch mode.

### 📦 Building for Production

To build the app for production:

```bash
npm run build
```

This builds the app to the `build` folder. It basically bundles React in production mode and optimizes the build for the best performance.

## 💡 Pro Tip: Load Sample Data

Want to see the app in action without manually typing tons of contacts?

1.  Open the app in your browser (usually `http://localhost:3000`).
2.  Open the **Developer Console** (F12 or Right Click -> Inspect -> Console).
3.  Type the following command and hit Enter:
    ```javascript
    populateTestData();
    ```
4.  Reload the page, and voilà! You'll have a list of sample contacts to play with.

---

## 📝 Requirements Implemented

This project fulfills the following requirements:

1.  **Add Contact**: Users can add name (required), email (required), and phone (optional).
2.  **Favorites**: Users can mark contacts as favorites.
3.  **Filtering**: View all contacts or filter to see only favorites.
4.  **Toggling**: Favoriting/Unfavoriting updates the list instantly.
5.  **Edit**: Modify any existing contact's details.
6.  **Persistence**: Data is stored via `localStorage` for simplicity and persistence.

---
