import '@toba/test';
import { getTypeInfo, TypeInfo } from './type-info';
import { DateStyle } from './date-format';
import { LocalizeType } from './localizers';

test('parses type information from template string literals', () => {
   const should: Map<string, TypeInfo> = new Map([
      [':n(2) text', { type: LocalizeType.Number, style: '2' }],
      [':p text', { type: LocalizeType.Percent }],
      [
         ':t(F) text',
         { type: LocalizeType.Date, style: DateStyle.LongDateAndExactTime }
      ]
   ]);

   should.forEach((value, key) => {
      expect(getTypeInfo(key)).toEqual(value);
   });
});
