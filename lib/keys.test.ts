import '@toba/test';
import { makeKey } from './keys';

test('converts template literals to a format string usable as a key', () => {
   const should: Map<string, string[]> = new Map([
      ['{0} has {1} in the bank', ['', ' has ', ':c in the bank']]
   ]);

   should.forEach((value, key) => {
      expect(makeKey(value)).toBe(key);
   });
});
