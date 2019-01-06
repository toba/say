import '@toba/test';
import { Locale } from '..';
import { formatNumber, isCurrencyCode } from './number';

test('identifies currency codes', () => {
   ['usd'].forEach(code => {
      expect(isCurrencyCode(code)).toBe(true);
   });
   ['blah'].forEach(code => {
      expect(isCurrencyCode(code)).toBe(false);
   });
});

test('accepts numeric parameter to control decimal places', () => {
   const should: Map<string, string> = new Map([
      ['2', '23.10'],
      ['4', '23.1000'],
      ['0', '23']
   ]);

   should.forEach((out, places) => {
      const fn = formatNumber(places);
      expect(fn(23.1, Locale.English)).toBe(out);
   });
});

test('accepts currency parameter', () => {
   const should: Map<string, string> = new Map([
      ['usd', '$23.10'],
      ['eur', '€23.10'],
      ['aud', 'A$23.10']
   ]);

   should.forEach((out, currency) => {
      const fn = formatNumber(currency);
      expect(fn(23.1, Locale.English)).toBe(out);
   });
});

test('formats percentages', () => {
   const should: Map<string, string> = new Map([['percent', '23%']]);

   should.forEach((out, currency) => {
      const fn = formatNumber(currency);
      expect(fn(0.23, Locale.English)).toBe(out);
   });
});
