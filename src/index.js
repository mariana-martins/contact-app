import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import 'typeface-roboto';
import './index.css';

import ListContacts from './components/ListContacts';
import AddEditContact from './components/AddEditContact';
import NotFound from './components/NotFound';
import * as serviceWorker from './serviceWorker';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={ListContacts} />
        <Route path="/add" exact component={AddEditContact} />
        <Route path="/edit/:id" exact component={AddEditContact} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

ReactDOM.render(<AppRouter />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
