import '@toba/test';
import { interleave } from './translations';

test('substitutes values for placeholder tokens', () => {
   const values = ['Hello', 'World'];
   const should: Map<string, string> = new Map([['{0} {1}!', 'Hello World!']]);
   should.forEach((text, key) => {
      expect(interleave(key, ...values)).toBe(text);
   });
});
