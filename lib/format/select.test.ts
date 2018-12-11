import '@toba/test';
import { Locale } from '../';
import { parse, formatSelect } from './select';

const literal = `{gender, select,
   male {He}
   female {She}
   other {They}
} will respond shortly.`;

test('converts ICU select string to option map', () => {
   // spacing variations
   [
      literal,
      '{gender, select, male {He} female {She} other {They}} will respond shortly.',
      '{gender, select, male{He} female{She} other{They}} will respond shortly.'
   ].forEach(l => {
      const map = parse(l);
      expect(map).toHaveKeys('male', 'female', 'other');
      expect(map.get('male')).toBe('He');
   });
});

test('builds format function for select options', () => {
   const fn = formatSelect(literal);
   const en = Locale.English;
   const should: Map<string, string> = new Map([
      ['male', 'He'],
      ['female', 'She'],
      ['other', 'They']
   ]);

   expect(fn).toBeDefined();

   should.forEach((text, choice) => {
      expect(fn(choice, en)).toBe(text);
   });
});
