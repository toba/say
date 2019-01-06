import '@toba/test';
import { config } from './config';
import { setTranslationPath, onTranslationChange, Locale } from './';
import { setLocale } from './translation';

const fn = jest.fn();

beforeAll(() => {
   onTranslationChange(fn);
   setTranslationPath('./__mocks__/');
});

test('loads translations from file', async () => {
   const en = Locale.English;
   expect(config.translations.has(en)).toBe(false);
   expect(fn).not.toHaveBeenCalled();

   await setLocale(en);

   expect(fn).toHaveBeenCalled();
   expect(fn).toHaveBeenCalledWith(en);
   expect(config.translations.has(en)).toBe(true);
});
