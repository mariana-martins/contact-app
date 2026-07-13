import { createRoot } from 'react-dom/client';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import MenuBar from './MenuBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  const router = createMemoryRouter([{ path: '/', element: <MenuBar /> }]);
  root.render(<RouterProvider router={router} />);
  root.unmount();
});
