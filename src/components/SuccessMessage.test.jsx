import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as Toast from '@radix-ui/react-toast';
import { vi } from 'vitest';
import SuccessMessage from './SuccessMessage';

function renderWithProvider(element) {
  return render(
    <Toast.Provider>
      <Toast.Viewport className="fixed top-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2 p-4 outline-none" />
      {element}
    </Toast.Provider>,
  );
}

it('renders the message text', () => {
  renderWithProvider(
    <SuccessMessage message="Contact saved" onClose={vi.fn()} />,
  );
  expect(screen.getByText('Contact saved')).toBeInTheDocument();
});

it('calls onClose when close button is clicked', async () => {
  const onClose = vi.fn();
  const user = userEvent.setup();
  renderWithProvider(
    <SuccessMessage message="Contact saved" onClose={onClose} />,
  );
  await user.click(screen.getByLabelText('Close notification'));
  expect(onClose).toHaveBeenCalled();
});
