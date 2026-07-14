import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AddEditContact from './AddEditContact';

vi.mock('../storage', () => ({
  getContactBySlug: vi.fn(() => undefined),
  upsertContact: vi.fn(),
  deleteContactBySlug: vi.fn(),
}));

function renderAddMode() {
  return render(
    <MemoryRouter initialEntries={['/add']}>
      <Routes>
        <Route path="/add" element={<AddEditContact />} />
        <Route path="/" element={<div>Home page</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

it('renders form fields and labels in add mode', () => {
  renderAddMode();
  expect(screen.getByText('Add new contact')).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/telephone/i)).toBeInTheDocument();
  expect(screen.getByText('Save')).toBeInTheDocument();
  expect(screen.getByText('Cancel')).toBeInTheDocument();
});

it('submit button starts disabled when name is empty', () => {
  renderAddMode();
  expect(screen.getByText('Save')).toBeDisabled();
});

it('cancel link navigates to home', async () => {
  const user = userEvent.setup();
  renderAddMode();
  await user.click(screen.getByText('Cancel'));
  expect(screen.getByText('Home page')).toBeInTheDocument();
});
