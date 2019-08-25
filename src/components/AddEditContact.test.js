import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import AddEditContact from './AddEditContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <AddEditContact />
    </Router>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
