import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import Contacts from './Contacts';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(
    <Router>
      <Contacts />
    </Router>,
  );
  root.unmount();
});
