import '@toba/test';
import { Locale } from './';
import { config, configure } from './config';

test('sets default configuration', () => {
   expect(config).toHaveProperty('locales', Locale.English);
});

test('updates configuration', () => {
   expect(config).toHaveProperty('locales', Locale.English);

   configure({
      locales: Locale.Spanish
   });

   expect(config).toHaveProperty('locales', Locale.Spanish);
});
