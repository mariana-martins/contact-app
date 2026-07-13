import { useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import DeleteDialog from './DeleteDialog';

function ContactRow({ entry, toggleFavorite, children }) {
  const { slug, name, email, telephone, favorite } = entry;
  const navigate = useNavigate();

  return (
    <tr
      onClick={() => navigate(`/edit/${slug}`)}
      className="group cursor-pointer transition-colors hover:bg-slate-50/80"
    >
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
      </td>
      <td className="py-3.5 pr-4 font-semibold whitespace-nowrap text-slate-800">
        {name}
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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs font-bold tracking-wider uppercase text-slate-400">
            <th scope="col" className="py-3 pl-4 w-12">
              Fav
            </th>
            <th scope="col" className="py-3 pr-4">
              Name
            </th>
            <th scope="col" className="py-3 pr-4">
              Email
            </th>
            <th scope="col" className="py-3 pr-4">
              Telephone
            </th>
            <th scope="col" className="py-3 pr-4 text-right">
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
