import { slugify } from './utils';

describe('slugify', () => {
  it('handles special characters and case', () => {
    expect(slugify(' aBc éçñ& 123  ')).toEqual('abc-ecn-and-123');
  });

  it('preserves already slugified strings', () => {
    expect(slugify('abc-123')).toEqual('abc-123');
  });

  it('returns empty string for empty input', () => {
    expect(slugify('')).toEqual('');
  });

  it('returns empty string for only spaces', () => {
    expect(slugify('   ')).toEqual('');
  });

  it('removes leading and trailing hyphens', () => {
    expect(slugify('--hello-world--')).toEqual('hello-world');
  });

  it('collapses multiple hyphens into one', () => {
    expect(slugify('hello   world---foo  bar')).toEqual('hello-world-foo-bar');
  });

  it('converts ampersand to -and-', () => {
    expect(slugify('rock & roll')).toEqual('rock-and-roll');
  });

  it('removes non-word characters', () => {
    expect(slugify('hello, world! #foo')).toEqual('hello-world-foo');
  });
});
