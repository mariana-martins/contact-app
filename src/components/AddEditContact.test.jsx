import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import AddEditContact from './AddEditContact';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Router>
      <AddEditContact />
    </Router>,
  );
  root.unmount();
});
