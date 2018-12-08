import '@toba/test';
import {
   dateFormats,
   DateFormat,
   timeFormats,
   TimeFormat
} from './format-date';
import { Locale } from './';

const d = new Date(2012, 11, 20, 19, 0, 0, 0);

test('defines options for each date format abbreviation', () => {
   expect(dateFormats).toHaveKeys(
      ...Object.keys(DateFormat)
         .map(key => DateFormat[key])
         .filter(
            code => ![DateFormat.ISO8601, DateFormat.RFC1123].includes(code)
         )
   );
});

test('defines options for each time format abbreviation', () => {
   expect(timeFormats).toHaveKeys(
      ...Object.keys(TimeFormat).map(key => TimeFormat[key])
   );
});

test('formats date according to named style', () => {
   const should: Map<DateFormat, string> = new Map([
      [DateFormat.Short, '12/20/2012'],
      [DateFormat.Long, 'Thursday, December 20, 2012'],
      [DateFormat.LongWithTime, 'Thursday, December 20, 2012, 7:00 PM'],
      [DateFormat.LongWithExactTime, 'Thursday, December 20, 2012, 7:00:00 PM'],
      [DateFormat.ShortWithTime, '12/20/2012, 7:00 PM'],
      [DateFormat.ShortWithExactTime, '12/20/2012, 7:00:00 PM'],
      //[DateStyle.ShortMonthAndDay, 'Dec 20'],
      [DateFormat.MonthAndDay, 'December 20'],
      //[DateStyle.ISO8601, '2012-12-20T18:00:00.000Z'],
      //[DateStyle.RFC1123, 'Thu, 20 Dec 2012 18:00:00 GMT'],
      //[DateStyle.ShortMonthAndYear, 'Dec 2012'],
      [DateFormat.MonthAndYear, 'December 2012']
   ]);

   should.forEach((value, key) => {
      expect(dateFormats.has(key)).toBe(true);
      expect(d.toLocaleString(Locale.English, dateFormats.get(key))).toBe(
         value
      );
   });
});

test('formats time according to named style', () => {
   const should: Map<TimeFormat, string> = new Map([
      [TimeFormat.Short, '7:00 PM'],
      [TimeFormat.Long, '7:00:00 PM']
   ]);

   should.forEach((value, key) => {
      expect(timeFormats.has(key)).toBe(true);
      expect(d.toLocaleString(Locale.English, timeFormats.get(key))).toBe(
         value
      );
   });
});
