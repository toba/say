import '@toba/test';
import { Label, Phrase } from './__mocks__/i18n/';
import { setTranslationPath } from './';
import { say, makePlaceholder, getPlaceholders, resetCache } from './say';
import { initialize } from './translation';

// compare tests
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js

beforeEach(() => {
   resetCache();
   setTranslationPath('./__mocks__/i18n/');
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

test('throws error if configuration is not ready', () => {
   let error: Error | undefined;
   let text: string | undefined;

   try {
      text = say(Label.Save);
   } catch (e) {
      error = e;
   }
   expect(error).toBeDefined();
   expect(text).toBeUndefined();
});

test('retrieves text for default locale', async () => {
   await initialize();
   const text = say(Label.Save);
   expect(text).toBe('Save');
});

test('assigns parsed placeholders to translation string literals', () => {
   const key = 'whatever';
   const literal = 'some text {key, date, long} and {key2} and {key3, time}';
   const parsed = getPlaceholders(key, literal);

   expect(parsed).toHaveKeys('key', 'key2', 'key3');
});

test('substitutes values for placeholders', async () => {
   await initialize();
   const text = say(Phrase.AccountBalance, {
      name: 'John',
      balance: 12345.67
   });

   expect(text).toBe('Hello John, you have $12,345.67 in your bank account.');
});
