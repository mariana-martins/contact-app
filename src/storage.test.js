import { beforeEach, describe, it, expect } from 'vitest';
import {
  getContacts,
  getContactBySlug,
  upsertContact,
  deleteContactBySlug,
} from './storage';

const testContact = {
  slug: 'john-doe',
  name: 'John Doe',
  email: 'john@test.com',
  telephone: '123',
  favorite: true,
};

beforeEach(() => {
  localStorage.clear();
});

describe('getContacts', () => {
  it('returns a list of contacts', () => {
    upsertContact(testContact);
    expect(getContacts()).toEqual([testContact]);
  });

  it('returns an empty array if stored contacts are empty', () => {
    expect(getContacts()).toEqual([]);
  });

  it('returns an empty array if no contact available', () => {
    localStorage.setItem('contacts', '{}');
    expect(getContacts()).toEqual([]);
  });
});

describe('getContactBySlug', () => {
  it('returns a contact if available', () => {
    upsertContact(testContact);
    expect(getContactBySlug('john-doe')).toEqual(testContact);
  });

  it('returns undefined if slug not provided', () => {
    expect(getContactBySlug()).toBeUndefined();
  });

  it('returns undefined if contact does not exist', () => {
    expect(getContactBySlug('nonexistent')).toBeUndefined();
  });
});

describe('upsertContact', () => {
  it('inserts a new contact', () => {
    upsertContact(testContact);
    expect(getContacts()).toHaveLength(1);
    expect(getContactBySlug('john-doe')).toEqual(testContact);
  });

  it('updates an existing contact', () => {
    upsertContact(testContact);
    upsertContact({ ...testContact, name: 'John Updated' });
    expect(getContacts()).toHaveLength(1);
    expect(getContactBySlug('john-doe').name).toBe('John Updated');
  });
});

describe('deleteContactBySlug', () => {
  it('deletes a contact if it exists', () => {
    upsertContact(testContact);
    deleteContactBySlug('john-doe');
    expect(getContacts()).toEqual([]);
  });

  it('does nothing if contact does not exist', () => {
    upsertContact(testContact);
    deleteContactBySlug('nonexistent');
    expect(getContacts()).toHaveLength(1);
  });
});
