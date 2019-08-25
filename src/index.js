import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import indigo from '@material-ui/core/colors/indigo';

import 'typeface-roboto';
import 'typeface-lobster';
import './index.css';

import Contacts from './components/Contacts';
import AddEditContact from './components/AddEditContact';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';
import { upsertContact, getContactBySlug } from './storage';
import { slugify } from './utils';

const theme = createMuiTheme({
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
    primary: indigo
  }
});

function AppRouter() {
  return (
    <ThemeProvider theme={responsiveFontSizes(theme)}>
      <Container maxWidth="md">
        <Router>
          <Switch>
            <Route path="/" exact component={Contacts} />
            <Route path="/add" exact component={AddEditContact} />
            <Route path="/edit/:id" exact component={AddEditContact} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Container>
    </ThemeProvider>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// can be used on console to load data for testing
// please reload page after calling it
window.populateTestData = () => {
  const createContact = (name, email, telephone, favorite) => ({
    name, email, telephone, favorite, slug: slugify(name)
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

  data.forEach(contact => {
    if (!getContactBySlug(contact.slug)) {
      upsertContact(contact);
    }
  });
}
