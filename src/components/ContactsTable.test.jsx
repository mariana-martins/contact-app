import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import ContactsTable from './ContactsTable';

const data = [
  {
    slug: 'john-doe',
    name: 'John Doe',
    email: 'john@test.com',
    telephone: '123',
    favorite: true,
  },
];

function renderTable(props = {}) {
  return render(
    <MemoryRouter>
      <ContactsTable
        data={data}
        toggleFavorite={vi.fn()}
        deleteContact={vi.fn()}
        {...props}
      />
    </MemoryRouter>,
  );
}

it('renders contact name, email, and telephone', () => {
  renderTable();
  expect(screen.getByText('John Doe')).toBeInTheDocument();
  expect(screen.getByText('john@test.com')).toBeInTheDocument();
  expect(screen.getByText('123')).toBeInTheDocument();
});

it('navigates to edit page when name is clicked', async () => {
  const user = userEvent.setup();
  renderTable();
  await user.click(screen.getByText('John Doe'));
});

it('calls toggleFavorite when heart button is clicked', async () => {
  const toggleFavorite = vi.fn();
  const user = userEvent.setup();
  renderTable({ toggleFavorite });
  await user.click(screen.getByLabelText('Remove John Doe from favorites'));
  expect(toggleFavorite).toHaveBeenCalledOnce();
});
