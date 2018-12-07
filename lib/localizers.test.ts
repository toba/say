import '@toba/test';
import { assertType, LocalizeType, localizers } from './localizers';
import { AllowedType } from './config';

test('verifies that value type matches formatter', () => {
   const pairs: Map<LocalizeType, AllowedType> = new Map();
   pairs
      .set(LocalizeType.Currency, 23.4)
      .set(LocalizeType.Number, 78999)
      .set(LocalizeType.Date, new Date());

   pairs.forEach((value, key) => {
      let e: Error | null = null;
      try {
         assertType(key, value);
      } catch (error) {
         e = error;
      }
      expect(e).toBeNull();
   });

   pairs.clear();
   pairs
      .set(LocalizeType.Currency, 'text')
      .set(LocalizeType.Number, new Date())
      .set(LocalizeType.Date, 3423);

   pairs.forEach((value, key) => {
      let e: Error = undefined;
      try {
         assertType(key, value);
      } catch (error) {
         e = error;
      }
      expect(e).toBeDefined();
   });
});

test('defines formatter function for all localization types', () => {
   Object.keys(LocalizeType)
      .map(key => LocalizeType[key])
      .forEach(type => {
         expect(localizers.has(type)).toBe(true);
      });
});
