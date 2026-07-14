import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MenuBar from './MenuBar';

function renderMenuBar(props = {}) {
  return render(
    <MemoryRouter>
      <MenuBar filterMode="all" onFilterChange={vi.fn()} {...props} />
    </MemoryRouter>,
  );
}

it('renders both filter buttons', () => {
  renderMenuBar();
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('My Favorites')).toBeInTheDocument();
});

it('calls onFilterChange with "all" when All is clicked', async () => {
  const onFilterChange = vi.fn();
  const user = userEvent.setup();
  renderMenuBar({ onFilterChange, filterMode: 'favorites' });
  await user.click(screen.getByText('All'));
  expect(onFilterChange).toHaveBeenCalledWith('all');
});

it('calls onFilterChange with "favorites" when My Favorites is clicked', async () => {
  const onFilterChange = vi.fn();
  const user = userEvent.setup();
  renderMenuBar({ onFilterChange });
  await user.click(screen.getByText('My Favorites'));
  expect(onFilterChange).toHaveBeenCalledWith('favorites');
});
