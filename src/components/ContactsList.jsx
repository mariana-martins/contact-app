import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import DeleteDialog from './DeleteDialog';

function ContactItem({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const navigate = useNavigate();

  return (
    <li className="group border-b border-slate-100 py-4 transition-colors last:border-none hover:bg-slate-50/80">
      <div className="flex items-center justify-between gap-4">
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
            className="cursor-pointer rounded-lg p-2 text-slate-500 transition-colors hover:bg-primary-50 hover:text-primary-600 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none min-h-11 min-w-11 flex items-center justify-center"
          >
            <div className="relative h-5 w-5">
              <Heart
                className={`absolute inset-0 h-5 w-5 fill-red-500 text-red-500 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  favorite
                    ? 'scale-100 opacity-100 blur-none'
                    : 'scale-[0.25] opacity-0 blur-sm'
                }`}
                aria-hidden="true"
              />
              <Heart
                className={`h-5 w-5 text-slate-500 transition-[opacity,filter,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
                  favorite
                    ? 'scale-[0.25] opacity-0 blur-sm'
                    : 'scale-100 opacity-100 blur-none'
                }`}
                aria-hidden="true"
              />
            </div>
          </button>
          <div className="min-w-0 flex-1">
            <button
              type="button"
              onClick={() => navigate(`/edit/${slug}`)}
              className="cursor-pointer truncate font-semibold text-slate-800 hover:text-primary-600 transition-colors text-left focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded"
            >
              {name}
            </button>
            <div className="mt-0.5 flex flex-col text-xs text-slate-500">
              <span className="truncate">{email}</span>
              <span className="truncate">{telephone}</span>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center">{children}</div>
      </div>
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
