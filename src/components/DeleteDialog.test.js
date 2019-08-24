import React from 'react';
import ReactDOM from 'react-dom';
import DeleteDialog from './DeleteDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DeleteDialog />, div);
  ReactDOM.unmountComponentAtNode(div);
});
