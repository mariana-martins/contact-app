const KEY = "contacts";

// get contacts from local storage and parse to object
function safeGet() {
  const value = localStorage.getItem(KEY);
  // if nothing on storage, return empty object
  if (!value) {
    return {};
  }
  return JSON.parse(value);
}

// stringify and save contacts on local storage
function save(contacts) {
  localStorage.setItem(KEY, JSON.stringify(contacts));
}

// get contacts as list
export function getContacts() {
  return Object.values(safeGet());
}

// get contact by slug, if available - otherwise, returns undefined
export function getContactBySlug(slug) {
  return safeGet()[slug];
}

// update or insert contact
export function upsertContact(contact) {
  const data = safeGet();
  data[contact.slug] = contact;
  save(data);
}

export function deleteContactBySlug(slug) {
  const data = safeGet();
  delete data[slug];
  save(data);
}
