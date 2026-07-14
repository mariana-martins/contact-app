import { useState, useEffect } from 'react';
import { getContacts, deleteContactBySlug, upsertContact } from '../storage';
import ContactsTable from './ContactsTable';
import ContactsList from './ContactsList';
import MenuBar from './MenuBar';
import SuccessMessage from './SuccessMessage';
import Footer from './Footer';

function Contacts() {
  const [data, setData] = useState(getContacts());
  const [filterMode, setFilterMode] = useState('all');
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    document.title = 'Contacts | Contact App';
  }, []);

  const toggleFavorite = (e, slug, name) => {
    e.stopPropagation();
    const updated = data.map((entry) => {
      if (entry.slug === slug) {
        return { ...entry, favorite: !entry.favorite };
      }
      return entry;
    });
    const entry = updated.find((entry) => entry.slug === slug);
    upsertContact(entry);
    setData(updated);
    setSuccessMessage(
      `${name} was ${entry.favorite ? 'added to' : 'removed from'} favorites`,
    );
  };

  const handleDelete = (slug) => {
    const entry = data.find((entry) => entry.slug === slug);
    deleteContactBySlug(slug);
    setData(getContacts());
    setSuccessMessage(`${entry.name} was deleted`);
  };

  const displayData =
    filterMode === 'all'
      ? data
      : data.filter((entry) => entry.favorite === true);

  return (
    <main className="w-full">
      <h1 className="font-heading my-8 text-center text-6xl tracking-wider text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] text-balance focus:outline-none focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-white rounded-lg">
        Contact App
      </h1>

      <section className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5 sm:p-8">
        <MenuBar filterMode={filterMode} onFilterChange={setFilterMode} />

        {displayData.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-base font-medium text-slate-500 text-pretty">
              No contacts found
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <ContactsTable
                data={displayData}
                toggleFavorite={toggleFavorite}
                deleteContact={handleDelete}
              />
            </div>

            {/* Mobile List View */}
            <div className="md:hidden">
              <ContactsList
                data={displayData}
                toggleFavorite={toggleFavorite}
                deleteContact={handleDelete}
              />
            </div>
          </>
        )}
      </section>

      {successMessage && (
        <SuccessMessage
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <Footer />
    </main>
  );
}

export default Contacts;
