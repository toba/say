import '@toba/test';
import { config, reset } from './config';
import { Label } from './__mocks__/i18n/';
import { Label as AddedLabel } from './__mocks__/component/';
import { setTranslationPath, addPath, onTranslationChange, Locale } from './';
import { setLocale, initialize, getTranslation } from './translation';

const fn = jest.fn();

beforeEach(() => {
   reset();
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

test('retrieves translation literal for key', async () => {
   await setLocale(Locale.French);
   const s = getTranslation(Label.Save);
   expect(s).toBe('French Save');
});

test('adds supplemental translation (such as for component)', async () => {
   await addPath('./__mocks__/component');
   const t1 = getTranslation(AddedLabel.Exit);
   expect(t1).toBe('Exit');
   // existing translations should be intact
   const t2 = getTranslation(Label.Save);
   expect(t2).toBe('Save');
});

test('supplemental translations are updated when locale changes', async () => {
   await addPath('./__mocks__/component');

   const t1 = getTranslation(AddedLabel.Exit);
   expect(t1).toBe('Exit');

   await setLocale(Locale.French);

   const t2 = getTranslation(Label.Save);
   expect(t2).toBe('French Save');

   const t3 = getTranslation(AddedLabel.Exit);
   expect(t3).toBe('French Exit');
});
