import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import DeleteDialog from './DeleteDialog';

it('renders the delete trigger button', () => {
  render(<DeleteDialog name="Test" onConfirm={vi.fn()} />);
  expect(screen.getByLabelText('Delete Test')).toBeInTheDocument();
});

it('opens the dialog when trigger is clicked', async () => {
  const user = userEvent.setup();
  render(<DeleteDialog name="Test" onConfirm={vi.fn()} />);
  await user.click(screen.getByLabelText('Delete Test'));
  expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
});

it('calls onConfirm when confirm is clicked', async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(<DeleteDialog name="Test" onConfirm={onConfirm} />);
  await user.click(screen.getByLabelText('Delete Test'));
  await user.click(screen.getByText('Yes, delete it!'));
  expect(onConfirm).toHaveBeenCalledTimes(1);
});

it('does not call onConfirm when cancel is clicked', async () => {
  const onConfirm = vi.fn();
  const user = userEvent.setup();
  render(<DeleteDialog name="Test" onConfirm={onConfirm} />);
  await user.click(screen.getByLabelText('Delete Test'));
  await user.click(screen.getByText('Cancel'));
  expect(onConfirm).not.toHaveBeenCalled();
});
