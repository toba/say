import path from 'path';
import '@toba/test';
import { mockFetch } from '@toba/test';
import { reset, config } from './config';
import { addSource, setBasePath } from './';
import { say, makePlaceholder, getPlaceholders } from './say';

// compare tests
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js

beforeAll(() => {
   mockFetch(url => path.join(__dirname, url.toString()));
});

beforeEach(async () => {
   reset();
   setBasePath('__mocks__/i18n/');
   await addSource('thing1');
});

test('throws error if trying to parse unsupported type', () => {
   let error: Error | undefined;

   try {
      makePlaceholder('unknown');
   } catch (e) {
      error = e;
   }
   expect(error).toBeDefined();
});

test('throws error if no translations are loaded', () => {
   let error: Error | undefined;
   let text: string | undefined;

   config.translations.clear();

   try {
      text = say('label.save');
   } catch (e) {
      error = e;
   }
   expect(error).toBeDefined();
   expect(text).toBeUndefined();
});

test('retrieves text for default locale', async () => {
   const text = say('label.save');
   expect(text).toBe('Save');
});

test('assigns parsed placeholders to translation string literals', () => {
   const key = 'whatever';
   const literal = 'some text {key, date, long} and {key2} and {key3, time}';
   const parsed = getPlaceholders(key, literal);

   expect(parsed).toHaveKeys('key', 'key2', 'key3');
});

test('substitutes values for placeholders', async () => {
   const text = say('account-balance', {
      name: 'John',
      balance: 12345.67
   });

   expect(text).toBe('Hello John, you have $12,345.67 in your bank account.');
});
