import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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

const router = createBrowserRouter([
  { path: '/', element: <Contacts /> },
  { path: '/add', element: <AddEditContact /> },
  { path: '/edit/:id', element: <AddEditContact /> },
  { path: '*', element: <NotFound /> },
]);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Toast.Provider swipeDirection="right">
    <div className="mx-auto max-w-4xl px-4 py-6">
      <RouterProvider router={router} />
    </div>
    <Toast.Viewport className="fixed top-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 p-4 outline-none" />
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
