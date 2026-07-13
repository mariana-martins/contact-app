import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import { indigo } from '@mui/material/colors';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto';
import '@fontsource/lobster';
import './index.css';

import Contacts from './components/Contacts';
import AddEditContact from './components/AddEditContact';
import NotFound from './components/NotFound';
import { upsertContact, getContactBySlug } from './storage';
import { slugify } from './utils';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: '4rem',
      fontFamily: 'lobster',
      textAlign: 'center',
      color: '#f0f0f0',
      letterSpacing: '0.3rem',
      margin: '50px 0',
    },
  },
  palette: {
    primary: indigo,
  },
});

function AppRouter() {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <Container maxWidth="md">
        <Router>
          <Routes>
            <Route path="/" element={<Contacts />} />
            <Route path="/add" element={<AddEditContact />} />
            <Route path="/edit/:id" element={<AddEditContact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<AppRouter />);

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
