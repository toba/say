import path from 'path';
import '@toba/test';
import { mockFetch } from '@toba/test';
import { config, reset } from './config';
import { addSource, onLocaleChange, Locale, setBasePath } from './';
import { setLocale, getTranslation } from './translation';

const fn = jest.fn();

beforeAll(() => {
   mockFetch(url => path.join(__dirname, url.toString()));
});

beforeEach(async () => {
   reset();
   setBasePath('__mocks__/i18n/');
   onLocaleChange(fn);
   await addSource('thing1/?.json');
});

// Babel may have trouble transforming this method for Jest
// https://github.com/airbnb/enzyme/issues/1460
test('loads initial translations from file', async () => {
   const en = Locale.English;
   expect(fn).not.toHaveBeenCalled();

   await setLocale(en);

   expect(fn).toHaveBeenCalledTimes(1);
   expect(fn).toHaveBeenCalledWith(en);
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
   const s = getTranslation('label.save');
   expect(s).toBe('French Save');
});

test('adds supplemental translation (such as for component)', async () => {
   await addSource('thing2/?');
   const t1 = getTranslation('label.exit');
   expect(t1).toBe('Exit');
   // existing translations should be intact
   const t2 = getTranslation('label.save');
   expect(t2).toBe('Save');
});

test('supplemental translations are updated when locale changes', async () => {
   await addSource('thing2/?');

   const t1 = getTranslation('label.exit');
   expect(t1).toBe('Exit');

   await setLocale(Locale.French);

   const t2 = getTranslation('label.save');
   expect(t2).toBe('French Save');

   const t3 = getTranslation('label.exit');
   expect(t3).toBe('French Exit');
});
