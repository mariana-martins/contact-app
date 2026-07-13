import { createRoot } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
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
  const router = createMemoryRouter([
    { path: '/', element: <ContactsTable data={data} /> },
  ]);
  root.render(<RouterProvider router={router} />);
  root.unmount();
});
