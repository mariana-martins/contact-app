import {
  getContacts,
  getContactBySlug,
  upsertContact,
  deleteContactBySlug,
} from './storage';

/*
  Tests not implemented yet - couldn't mock localStorage
  Looks like there is a bug on Jest, I'll be back here later
  Tests will be manual on the browser

  Bug ticket on Jest: https://github.com/facebook/jest/issues/6798
*/

describe('getContacts', () => {
  it('should return a list of contacts', () => { });
  it('should return an empty array if stored contacts are empty', () => { });
  it('should return an empty array if no contact available', () => { });
});

describe('getContactBySlug', () => {
  it('should return a contact if available', () => { });
  it('should return undefined if slug not provided', () => { });
  it('should return undefined if contact does not exist', () => { });
});

describe('upsertContact', () => {
  it('should insert contact', () => { });
  it('should update existing contact', () => { });
});

describe('deleteContactBySlug', () => {
  it('should delete a contact if it exists', () => { });
  it('does nothing if contact does not exist', () => { });
});
