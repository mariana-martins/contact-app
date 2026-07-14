import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import DeleteDialog from './DeleteDialog';

function ContactRow({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const navigate = useNavigate();

  return (
    <tr className="group transition-colors hover:bg-slate-50/80">
      <td className="py-3.5 pl-4 whitespace-nowrap">
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
      </td>
      <td className="py-3.5 pr-4 whitespace-nowrap">
        <button
          type="button"
          onClick={() => navigate(`/edit/${slug}`)}
          className="cursor-pointer font-semibold text-slate-800 hover:text-primary-600 transition-colors focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none rounded"
        >
          {name}
        </button>
      </td>
      <td className="py-3.5 pr-4 whitespace-nowrap text-slate-600">{email}</td>
      <td className="py-3.5 pr-4 whitespace-nowrap text-slate-600">
        {telephone}
      </td>
      <td className="py-3.5 pr-4 text-right whitespace-nowrap">{children}</td>
    </tr>
  );
}

function ContactsTable({ data, toggleFavorite, deleteContact }) {
  return (
    <div
      className="overflow-x-auto focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:outline-none rounded-xl"
      tabIndex={0}
      role="region"
      aria-label="Contacts table, scroll horizontally to see all columns"
    >
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs font-bold tracking-wider uppercase text-slate-400">
            <th scope="col" className="py-3 pl-4 w-12">
              <span className="sr-only">Favorite</span>
              <span aria-hidden="true">Fav</span>
            </th>
            <th scope="col" className="py-3 pr-4 text-slate-500">
              Name
            </th>
            <th scope="col" className="py-3 pr-4 text-slate-500">
              Email
            </th>
            <th scope="col" className="py-3 pr-4 text-slate-500">
              Telephone
            </th>
            <th scope="col" className="py-3 pr-4 text-right text-slate-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((entry) => (
            <ContactRow
              key={entry.slug}
              entry={entry}
              toggleFavorite={toggleFavorite}
            >
              <DeleteDialog
                name={entry.name}
                onConfirm={() => deleteContact(entry.slug)}
              />
            </ContactRow>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContactsTable;
