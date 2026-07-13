import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import DeleteDialog from './DeleteDialog';

function ContactItem({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/edit/${slug}`)}
      className="group flex cursor-pointer items-center justify-between gap-4 border-b border-slate-100 py-4 transition-colors last:border-none hover:bg-slate-50/80"
    >
      <div className="flex items-center gap-3 overflow-hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(e, slug, name);
          }}
          aria-label={
            favorite
              ? `Remove ${name} from favorites`
              : `Add ${name} to favorites`
          }
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <Heart
            className={`h-5 w-5 transition-transform ${
              favorite
                ? 'fill-red-500 text-red-500 scale-110'
                : 'text-slate-400'
            }`}
            aria-hidden="true"
          />
        </button>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-800">{name}</p>
          <div className="mt-0.5 flex flex-col text-xs text-slate-500">
            <span className="truncate">{email}</span>
            <span className="truncate">{telephone}</span>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center">{children}</div>
    </li>
  );
}

function ContactsList({ data, toggleFavorite, deleteContact }) {
  return (
    <ul className="divide-y divide-slate-100">
      {data.map((entry) => (
        <ContactItem
          key={entry.slug}
          entry={entry}
          toggleFavorite={toggleFavorite}
        >
          <DeleteDialog
            name={entry.name}
            onConfirm={() => deleteContact(entry.slug)}
          />
        </ContactItem>
      ))}
    </ul>
  );
}

export default ContactsList;
