import '@toba/test';
import { config } from './config';
import { Label } from './__mocks__/i18n/';
import { setTranslationPath, onTranslationChange, Locale } from './';
import { setLocale, initialize, getTranslation } from './translation';

const fn = jest.fn();

beforeAll(() => {
   onTranslationChange(fn);
   setTranslationPath('./__mocks__/i18n/');
});

// Babel may have trouble transforming this method for Jest
// https://github.com/airbnb/enzyme/issues/1460
test('loads initial translations from file', async () => {
   const en = Locale.English;
   expect(config.translations.has(en)).toBe(false);
   expect(fn).not.toHaveBeenCalled();
   expect(config.ready).toBe(false);

   await initialize();

   expect(fn).toHaveBeenCalledTimes(1);
   expect(fn).toHaveBeenCalledWith(en);
   expect(config.ready).toBe(true);
   expect(config.translations.has(en)).toBe(true);
});

test('loads alternate translations from file', async () => {
   const fr = Locale.French;
   expect(config.translations.has(fr)).toBe(false);

   await setLocale(fr);
   expect(fn).toHaveBeenCalledTimes(2);
   expect(fn).toHaveBeenLastCalledWith(fr);
   expect(config.translations.has(fr)).toBe(true);
});

test('retrieves translation literal for key', () => {
   const s = getTranslation(Label.Save);
   expect(s).toBe('French Save');
});
