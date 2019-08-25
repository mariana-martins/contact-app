import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import Contacts from './Contacts';

// mock material ui to do nothing when calling makeStyles
jest.mock('@material-ui/core/styles', () => ({
  makeStyles: () => () => ({}),
}));

// mock material ui to do nothing when calling useMediaQuery
jest.mock('@material-ui/core/useMediaQuery', () => () => () => ({}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Contacts /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
