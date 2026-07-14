import { useEffect } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from 'react-router-dom';
import * as Toast from '@radix-ui/react-toast';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto';
import '@fontsource/lobster';
import './index.css';

import Contacts from './components/Contacts';
import AddEditContact from './components/AddEditContact';
import NotFound from './components/NotFound';
import { upsertContact, getContactBySlug } from './storage';
import { slugify } from './utils';

function RootLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      const h1 = document.querySelector('main h1');
      if (h1) {
        h1.setAttribute('tabindex', '-1');
        h1.focus({ preventScroll: true });
        const clearTabIndex = () => h1.removeAttribute('tabindex');
        h1.addEventListener('blur', clearTabIndex, { once: true });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-slate-900 focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
      >
        Skip to main content
      </a>
      <div className="mx-auto max-w-4xl px-4 py-6" id="main-content">
        <Outlet />
      </div>
      <Toast.Viewport className="fixed top-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 p-4 outline-none" />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <Contacts /> },
      { path: '/add', element: <AddEditContact /> },
      { path: '/edit/:id', element: <AddEditContact /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Toast.Provider swipeDirection="right">
    <RouterProvider router={router} />
  </Toast.Provider>,
);

// can be used on console to load data for testing
// please reload page after calling it
window.populateTestData = () => {
  const createContact = (name, email, telephone, favorite) => ({
    name,
    email,
    telephone,
    favorite,
    slug: slugify(name),
  });

  const data = [
    createContact('Josh', 'josh@test.com', '000', true),
    createContact('Mary', 'mary@test.com', '111', true),
    createContact('Paul', 'paul@test.com', '222', false),
    createContact('John', 'josh@test.com', '333', false),
    createContact('Mike', 'mike@test.com', '444', true),
    createContact('Anna', 'anna@test.com', '555', false),
    createContact('Hamish Smith', 'hamish@test.com', '123 456 789', true),
  ];

  data.forEach((contact) => {
    if (!getContactBySlug(contact.slug)) {
      upsertContact(contact);
    }
  });
};
