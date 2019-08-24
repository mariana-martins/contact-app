import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import ListContacts from './ListContacts';

// mock material ui to do nothing when calling makeStyles
jest.mock('@material-ui/core/styles', () => ({
  makeStyles: () => () => ({}),
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><ListContacts /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
