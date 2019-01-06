import '@toba/test';
import { Locale } from './';
import { config, setPath, setTranslations } from './config';

test('sets default configuration', () => {
   expect(config).toHaveProperty('locale', Locale.English);
});

test('updates configuration', () => {
   const en = Locale.English;
   expect(config).toHaveProperty('locale', en);
   expect(config).toHaveProperty('path', './locale');
   expect(config.translations.has(en)).toBe(false);

   //setLocale(Locale.Spanish);
   setPath('./test');
   setTranslations(en, { key: 'text' });

   //expect(config).toHaveProperty('locale', Locale.Spanish);
   expect(config).toHaveProperty('fallbackLocale', en);
   expect(config).toHaveProperty('path', './test');
   expect(config.translations.has(en)).toBe(true);
});
