import '@toba/test'
import {
   dateFormats,
   DateFormat,
   timeFormats,
   TimeFormat,
   formatDate
} from './date'
import { Locale } from '..'

/**
 * For testing purposes, the date creation and `toString` methods all use UTC.
 */
const d = new Date(Date.UTC(2012, 11, 20, 19, 0, 0, 0))

test('defines options for each date format abbreviation', () => {
   expect(dateFormats).toHaveKeys(
      DateFormat.Short,
      DateFormat.ShortWithTime,
      DateFormat.ShortWithExactTime,
      DateFormat.Long,
      DateFormat.LongWithTime,
      DateFormat.LongWithExactTime
   )
})

test('defines options for each time format abbreviation', () => {
   expect(timeFormats).toHaveKeys(TimeFormat.Long, TimeFormat.Short)
})

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
      [DateFormat.MonthAndYear, 'December 2012']
   ])

   should.forEach((value, key) => {
      expect(dateFormats.has(key)).toBe(true)
      expect(
         d.toLocaleString(Locale.English, {
            ...dateFormats.get(key),
            timeZone: 'UTC'
         })
      ).toBe(value)
   })
})

test('formats date with named built-in methods', () => {
   const should: Map<DateFormat, string> = new Map([
      [DateFormat.ISO8601, '2012-12-20T19:00:00.000Z'],
      [DateFormat.RFC1123, 'Thu, 20 Dec 2012 19:00:00 GMT'],
      [DateFormat.Timestamp, '1356030000000']
   ])

   should.forEach((value, key) => {
      const fn = formatDate(key)
      expect(dateFormats.has(key)).toBe(false)
      expect(fn(d, Locale.English)).toBe(value)
   })
})

test('formats time according to named style', () => {
   const should: Map<TimeFormat, string> = new Map([
      [TimeFormat.Short, '7:00 PM'],
      [TimeFormat.Long, '7:00:00 PM']
   ])

   should.forEach((value, key) => {
      expect(timeFormats.has(key)).toBe(true)
      expect(
         d.toLocaleString(Locale.English, {
            ...timeFormats.get(key),
            timeZone: 'UTC'
         })
      ).toBe(value)
   })
})
