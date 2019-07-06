import '@toba/test';
import { Locale } from './';
import { config, setTranslations, setBasePath } from './config';

test('sets default configuration', () => {
   expect(config).toHaveProperty('locale', Locale.English);
});

test('updates configuration', () => {
   const en = Locale.English;
   expect(config).toHaveProperty('locale', en);
   expect(config.translations.has(en)).toBe(false);

   //setLocale(Locale.Spanish);
   setTranslations(en, { key: 'text' });

   //expect(config).toHaveProperty('locale', Locale.Spanish);
   expect(config).toHaveProperty('fallbackLocale', en);
   expect(config.translations.has(en)).toBe(true);
});

test('allows updating base path', () => {
   expect(config).toHaveProperty('basePath');

   setBasePath('something');
   expect(config.basePath).toBe('something/');

   setBasePath('something/else/');
   expect(config.basePath).toBe('something/else/');
});
