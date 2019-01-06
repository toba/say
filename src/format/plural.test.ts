import '@toba/test';
import { Locale } from '../';
import { parse, formatPlural } from './plural';

const literal = `You have {itemCount, plural,
   =0 {no items}
  one {# item}
other {# items}
}`;

test('converts ICU plural string to rule map', () => {
   // spacing variations
   [
      literal,
      'You have {itemCount, plural, =0 {no items} one {# item} other {# items}',
      'You have {itemCount, plural, =0{no items} one{# item} other{# items}'
   ].forEach(l => {
      const map = parse(l);
      expect(map).toHaveKeys('=0', 'one', 'other');
      expect(map.get('one')).toBe('# item');
   });
});

test('builds format function for plural rules', () => {
   const fn = formatPlural(literal);
   const en = Locale.English;
   const should: Map<number, string> = new Map([
      [0, 'no items'],
      [1, '1 item'],
      [2, '2 items'],
      [100, '100 items']
   ]);

   expect(fn).toBeDefined();

   should.forEach((text, count) => {
      expect(fn(count, en)).toBe(text);
   });
});
