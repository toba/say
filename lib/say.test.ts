import '@toba/test';
import { makePlaceholder, getPlaceholders, resetCache } from './say';

// compare tests
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js

beforeEach(resetCache);

test('throws error if trying to parse unsupported type', () => {
   let error: Error | undefined;

   try {
      makePlaceholder('unknown');
   } catch (e) {
      error = e;
   }
   expect(error).toBeDefined();
});

test('assigns parsed placeholders to translation string literals', () => {
   const key = 'whatever';
   const literal = 'some text {key, date, long} and {key2} and {key3, time}';
   const parsed = getPlaceholders(key, literal);

   expect(parsed).toHaveKeys('key', 'key2', 'key3');

   //expect(parse(literal)).toBe(2);
});
