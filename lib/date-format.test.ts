import '@toba/test';
import { dateStyleOptions, DateStyle } from './date-format';
import { LanguageTag } from './';

test('defines options for each custom format abbreviation', () => {
   expect(dateStyleOptions).toHaveKeys(
      ...Object.keys(DateStyle)
         .map(key => DateStyle[key])
         .filter(code => ![DateStyle.ISO8601, DateStyle.RFC1123].includes(code))
   );
});

test('formats date according to named style', () => {
   const d = new Date(2012, 11, 20, 19, 0, 0, 0);
   const should: Map<DateStyle, string> = new Map([
      [DateStyle.ShortDate, '12/20/2012'],
      [DateStyle.LongDate, 'Thursday, December 20, 2012'],
      [DateStyle.LongDateAndTime, 'Thursday, December 20, 2012, 7:00 PM'],
      [
         DateStyle.LongDateAndExactTime,
         'Thursday, December 20, 2012, 7:00:00 PM'
      ],
      [DateStyle.ShortDateAndTime, '12/20/2012, 7:00 PM'],
      [DateStyle.ShortDateAndExactTime, '12/20/2012, 7:00:00 PM'],
      //[DateStyle.ShortMonthAndDay, 'Dec 20'],
      [DateStyle.MonthAndDay, 'December 20'],
      //[DateStyle.ISO8601, '2012-12-20T18:00:00.000Z'],
      //[DateStyle.RFC1123, 'Thu, 20 Dec 2012 18:00:00 GMT'],
      [DateStyle.TimeOnly, '7:00 PM'],
      [DateStyle.ExactTime, '7:00:00 PM'],
      //[DateStyle.ShortMonthAndYear, 'Dec 2012'],
      [DateStyle.MonthAndYear, 'December 2012']
   ]);

   should.forEach((value, key) => {
      expect(dateStyleOptions.has(key)).toBe(true);
      expect(
         d.toLocaleString(LanguageTag.English, dateStyleOptions.get(key))
      ).toBe(value);
   });
});
