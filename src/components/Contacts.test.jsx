import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Contacts from './Contacts';

vi.mock('../storage', () => ({
  getContacts: vi.fn(() => []),
  upsertContact: vi.fn(),
  deleteContactBySlug: vi.fn(),
}));

it('renders the main heading "Contact App"', () => {
  render(
    <MemoryRouter>
      <Contacts />
    </MemoryRouter>,
  );
  expect(screen.getByText('Contact App')).toBeInTheDocument();
});

it('shows "No contacts found" when storage is empty', () => {
  render(
    <MemoryRouter>
      <Contacts />
    </MemoryRouter>,
  );
  expect(screen.getByText('No contacts found')).toBeInTheDocument();
});
