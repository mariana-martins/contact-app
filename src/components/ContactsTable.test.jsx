import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import ContactsTable from './ContactsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const data = [
    {
      slug: 'test',
      name: 'Test',
      email: 'abc@test.com',
      telephone: '000',
      favorite: true,
    },
  ];
  const root = createRoot(div);
  root.render(
    <Router>
      <ContactsTable data={data} />
    </Router>,
  );
  root.unmount();
});
