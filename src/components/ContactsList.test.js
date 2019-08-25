
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ContactsList from './ContactsList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const data = [{
    slug: 'test',
    name: 'Test',
    email: 'abc@test.com',
    telephone: '000',
    favorite: true,
  }];
  ReactDOM.render(<Router><ContactsList data={data} /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});
