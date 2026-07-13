import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  getContactBySlug,
  upsertContact,
  deleteContactBySlug,
} from '../storage';
import { slugify } from '../utils';
import Footer from './Footer';

// Using W3C regexp available on https://emailregex.com/
const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// Reference: https://regexr.com/3c53v
// eslint-disable-next-line
const telephoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;

function AddEditContact() {
  const { id } = useParams();
  const isAddMode = !id;
  const [values, setValues] = useState(
    isAddMode
      ? {
          name: '',
          email: '',
          telephone: '',
          favorite: true,
        }
      : getContactBySlug(id),
  );

  const [saved, setSaved] = useState(false);

  // If it is on edit mode and contact does not exist than go to home.
  if (!isAddMode && !getContactBySlug(id)) {
    return <Navigate to="/" />;
  }

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleCheckbox = (name) => (event) => {
    setValues({ ...values, [name]: event.target.checked });
  };

  const validateRequired = (value) => {
    return value && value.trim() !== '';
  };

  const isNameValid = () => {
    const slug = slugify(values.name);
    const savedContact = getContactBySlug(slug);
    if (isAddMode) {
      return !savedContact;
    } else {
      return !savedContact || slug === id;
    }
  };

  const isEmailValid = () => {
    const { email } = values;
    return !email || emailRegex.test(email);
  };

  const isTelephoneValid = () => {
    const { telephone } = values;
    return !telephone || telephoneRegex.test(telephone);
  };

  const isFormValid = () => {
    const { name, email } = values;
    return (
      validateRequired(name) &&
      isNameValid() &&
      validateRequired(email) &&
      emailRegex.test(email)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isFormValid()) return;

    const slug = slugify(values.name);
    upsertContact({
      ...values,
      slug,
    });
    if (!isAddMode && slug !== id) {
      deleteContactBySlug(id);
    }
    setSaved(true);
  };

  return (
    <main>
      {saved && <Navigate to="/" />}
      <h1 className="font-heading my-8 text-center text-6xl tracking-wider text-slate-100 drop-shadow-md">
        {isAddMode ? 'Add new contact' : 'Edit contact'}
      </h1>

      <section className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-900/5 sm:p-8">
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          {/* Name Input */}
          <div>
            <label
              htmlFor="contact-name"
              className="block text-sm font-semibold text-slate-700"
            >
              Name <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={values.name}
              onChange={handleChange('name')}
              aria-invalid={!isNameValid()}
              aria-describedby={!isNameValid() ? 'name-error' : undefined}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            {!isNameValid() && (
              <p id="name-error" className="mt-1.5 text-sm text-red-600">
                This contact already exists.
              </p>
            )}
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="contact-email"
              className="block text-sm font-semibold text-slate-700"
            >
              Email <span className="text-red-500">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={values.email}
              onChange={handleChange('email')}
              aria-invalid={!isEmailValid()}
              aria-describedby={!isEmailValid() ? 'email-error' : undefined}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            {!isEmailValid() && (
              <p id="email-error" className="mt-1.5 text-sm text-red-600">
                Email is invalid.
              </p>
            )}
          </div>

          {/* Telephone Input */}
          <div>
            <label
              htmlFor="contact-telephone"
              className="block text-sm font-semibold text-slate-700"
            >
              Telephone
            </label>
            <input
              id="contact-telephone"
              type="tel"
              value={values.telephone}
              onChange={handleChange('telephone')}
              aria-invalid={!isTelephoneValid()}
              aria-describedby={!isTelephoneValid() ? 'tel-error' : undefined}
              className="mt-1.5 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 shadow-xs transition-colors placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:outline-none"
            />
            {!isTelephoneValid() && (
              <p id="tel-error" className="mt-1.5 text-sm text-red-600">
                Telephone is invalid.
              </p>
            )}
          </div>

          {/* Favorite Checkbox */}
          <div className="flex items-center gap-3 pt-1">
            <input
              id="contact-favorite"
              type="checkbox"
              checked={values.favorite}
              onChange={handleCheckbox('favorite')}
              className="h-5 w-5 rounded-md border-slate-300 text-primary-600 focus:ring-primary-500"
            />
            <label
              htmlFor="contact-favorite"
              className="text-sm font-semibold text-slate-700 cursor-pointer"
            >
              Is it a favorite contact?
            </label>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <Link
              to="/"
              className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!isFormValid()}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
            >
              Save
            </button>
          </div>
        </form>
      </section>

      <Footer />
    </main>
  );
}

export default AddEditContact;
