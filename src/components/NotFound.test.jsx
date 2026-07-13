import { createRoot } from 'react-dom/client';
import NotFound from './NotFound';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<NotFound />);
  root.unmount();
});
