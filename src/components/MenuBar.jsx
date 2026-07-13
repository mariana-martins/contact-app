import { Link } from 'react-router-dom';
import { PlusCircle, Plus } from 'lucide-react';

function MenuBar({ filterMode, onFilterChange }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div
        role="group"
        aria-label="Filter contacts"
        className="inline-flex rounded-xl bg-slate-100 p-1 shadow-inner"
      >
        <button
          type="button"
          aria-pressed={filterMode === 'all'}
          onClick={() => onFilterChange('all')}
          className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
            filterMode === 'all'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          } focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none`}
        >
          All
        </button>
        <button
          type="button"
          aria-pressed={filterMode === 'favorites'}
          onClick={() => onFilterChange('favorites')}
          className={`rounded-lg px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all ${
            filterMode === 'favorites'
              ? 'bg-primary-600 text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          } focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none`}
        >
          My Favorites
        </button>
      </div>

      {/* Desktop New Contact Button */}
      <div className="hidden sm:block">
        <Link
          to="/add"
          className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
        >
          <PlusCircle className="h-4 w-4" aria-hidden="true" />
          New Contact
        </Link>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="sm:hidden">
        <Link
          to="/add"
          aria-label="Add new contact"
          className="fixed right-6 bottom-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary-600 text-white shadow-xl transition-transform hover:bg-primary-700 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
        >
          <Plus className="h-6 w-6" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

export default MenuBar;
