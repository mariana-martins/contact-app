import { createRoot } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Contacts from './Contacts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  const router = createMemoryRouter([{ path: '/', element: <Contacts /> }]);
  root.render(<RouterProvider router={router} />);
  root.unmount();
});
