import React from 'react';
import ReactDOM from 'react-dom';
import AddEditContact from './AddEditContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AddEditContact />, div);
  ReactDOM.unmountComponentAtNode(div);
});
