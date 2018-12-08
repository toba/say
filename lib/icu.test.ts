import '@toba/test';
import { parsePlaceholder, parse } from './icu';

// compare tests
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js

test('throws error if trying to parse unsupported type', () => {
   let error: Error | undefined;

   try {
      parsePlaceholder('unknown');
   } catch (e) {
      error = e;
   }
   expect(error).toBeDefined();
});

test('a bunch of things', () => {
   const literal = 'some text {key, date, format} and {key2} and {key3, time}';
   expect(parse(literal)).toBe(2);
});
