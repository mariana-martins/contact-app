import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import 'typeface-roboto';
import './index.css';

import ListContacts from './components/ListContacts';
import AddEditContact from './components/AddEditContact';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: '4rem',
      textAlign: 'center',
      color: '#f0f0f0',
      margin: '50px 0',
    },
  },
});

function AppRouter() {
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Router>
          <Switch>
            <Route path="/" exact component={ListContacts} />
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
