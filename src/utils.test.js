import { slugify } from './utils';

describe('slugify', () => {
  it('removes special characters', () => {
    const result = slugify(" aBc éçñ& 123  ");

    expect(result).toEqual('abc-ecn-and-123');
  });
  it('preserves already slugified strings', () => {
    const data = slugify("abc-123");

    expect(slugify(data)).toEqual(data);
  });
});
