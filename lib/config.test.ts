import '@toba/test';
import { CurrencyCode, Locale } from './';
import { config, BasicType, configure } from './config';

test('sets default configuration', () => {
   expect(config).toHaveProperty(BasicType.Number, {
      currency: CurrencyCode.USDollar
   });
});

test('updates configuration', () => {
   expect(config).toHaveProperty('locales', Locale.English);

   configure({
      locales: Locale.Spanish
   });

   expect(config).toHaveProperty('locales', Locale.Spanish);
});
