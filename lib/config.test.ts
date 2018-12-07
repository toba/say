import '@toba/test';
import { CurrencyCode, LanguageTag } from './';
import { config, BasicType, configure } from './config';

test('sets default configuration', () => {
   expect(config).toHaveProperty(BasicType.Number, {
      currency: CurrencyCode.USDollar
   });
});

test('updates configuration', () => {
   expect(config).toHaveProperty('locales', null);

   configure({
      locales: LanguageTag.Spanish
   });

   expect(config).toHaveProperty('locales', LanguageTag.Spanish);
});
