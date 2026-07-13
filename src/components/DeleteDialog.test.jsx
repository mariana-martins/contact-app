import { createRoot } from 'react-dom/client';
import DeleteDialog from './DeleteDialog';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<DeleteDialog />);
  root.unmount();
});
