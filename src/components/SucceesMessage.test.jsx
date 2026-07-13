import React from 'react';
import { createRoot } from 'react-dom/client';
import SuccessMessage from './SuccessMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const root = createRoot(div);
  root.render(<SuccessMessage />);
  root.unmount();
});
