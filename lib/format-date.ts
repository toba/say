import { Formatter } from './icu';
import { Locale } from './constants';

/**
 * Date format name representation.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
 */
export enum NameStyle {
   /**
    * Shortest representation
    * @example "D" for December
    */
   Narrow = 'narrow',
   /**
    * Abbreviation
    * @example "Dec" for December
    */
   Short = 'short',
   /**
    * Full name
    * @example "December" for December
    */
   Long = 'long',
   /**
    * Only used by some operating systems
    */
   Full = 'full'
}

export enum DigitStyle {
   /** Number is shown without leading zeros. */
   Numeric = 'numeric',
   /** Number is shown as two digits with leading zero as necessary. */
   TwoDigit = '2-digit'
}

/**
 * Style labels that can be used as an argument to the `date` `LocalizeType`
 * suffix on a template string token to indicate specific formatting.
 * @example
 * `text ${value}:[LocalizeType]([DateStyle]) text`
 * `text ${value}:t(G) text`
 */
export enum DateFormat {
   /** @example "2/20/2012" */
   Short = 'short',

   /** @example "Thursday, December 20, 2012" */
   Long = 'long',

   /** @example "Thursday, December 20, 2012, 7:00 PM" */
   LongWithTime = 'longWithTime',

   /** @example "Thursday, December 20, 2012, 7:00:00 PM" */
   LongWithExactTime = 'longWithExactTime',

   /** @example "12/20/2012, 7:00 PM" */
   ShortWithTime = 'shortWithTime',

   /** @example "12/20/2012, 7:00:00 PM" */
   ShortWithExactTime = 'shortWithExactTime',

   /** @example "Dec 20" */
   ShortMonthAndDay = 'shortMonthDay',

   /** @example "December 20" */
   MonthAndDay = 'monthDay',

   /** @example "2012-12-20T18:00:00.000Z" */
   ISO8601 = 'iso8601',

   /** @example "Thu, 20 Dec 2012 18:00:00 GMT" */
   RFC1123 = 'rfc1123',

   /** @example "Dec 2012" */
   ShortMonthAndYear = 'shortMonthYear',

   /** @example "December 2012" */
   MonthAndYear = 'monthYear'
}

export enum TimeFormat {
   /** @example "7:00 PM" */
   Short = 'short',

   /** @example "7:00:00 PM" */
   Long = 'long'
}

const defaultDateFormat: Intl.DateTimeFormatOptions = {
   weekday: undefined,
   era: undefined,
   year: undefined,
   month: undefined,
   day: undefined,
   hour: undefined,
   minute: undefined,
   second: undefined,
   timeZoneName: undefined
};

/**
 * Time format configurations.
 */
export const timeFormats: Map<string, Intl.DateTimeFormatOptions> = new Map([
   [
      TimeFormat.Short,
      {
         ...defaultDateFormat,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit
      }
   ],
   [
      TimeFormat.Long,
      {
         ...defaultDateFormat,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit,
         second: DigitStyle.TwoDigit
      }
   ]
]);

/**
 * Date format configurations.
 */
export const dateFormats: Map<string, Intl.DateTimeFormatOptions> = new Map([
   [
      DateFormat.Short,
      {
         ...defaultDateFormat,
         year: DigitStyle.Numeric,
         month: DigitStyle.Numeric,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.Long,
      {
         ...defaultDateFormat,
         weekday: NameStyle.Long,
         year: DigitStyle.Numeric,
         month: NameStyle.Long,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.LongWithTime,
      {
         ...defaultDateFormat,
         weekday: NameStyle.Long,
         year: DigitStyle.Numeric,
         month: NameStyle.Long,
         day: DigitStyle.Numeric,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit
      }
   ],
   [
      DateFormat.LongWithExactTime,
      {
         ...defaultDateFormat,
         weekday: NameStyle.Long,
         year: DigitStyle.Numeric,
         month: NameStyle.Long,
         day: DigitStyle.Numeric,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit,
         second: DigitStyle.TwoDigit
      }
   ],
   [
      DateFormat.ShortWithTime,
      {
         ...defaultDateFormat,
         year: DigitStyle.Numeric,
         month: DigitStyle.Numeric,
         day: DigitStyle.Numeric,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit
      }
   ],
   [
      DateFormat.ShortWithExactTime,
      {
         ...defaultDateFormat,
         year: DigitStyle.Numeric,
         month: DigitStyle.Numeric,
         day: DigitStyle.Numeric,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit,
         second: DigitStyle.TwoDigit
      }
   ],
   [
      DateFormat.ShortMonthAndDay,
      {
         ...defaultDateFormat,
         month: NameStyle.Short,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.MonthAndDay,
      {
         ...defaultDateFormat,
         month: NameStyle.Long,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.ShortMonthAndYear,
      {
         ...defaultDateFormat,
         year: DigitStyle.Numeric,
         month: NameStyle.Long
      }
   ],
   [
      DateFormat.MonthAndYear,
      {
         ...defaultDateFormat,
         year: DigitStyle.Numeric,
         month: NameStyle.Long
      }
   ]
]);

/**
 * Lookup format and build function.
 */
export function formatDate(format?: DateFormat | string): Formatter<Date> {
   return (d: Date, locale: Locale) => d.toLocaleString(locale);
}

/**
 * Lookup format and build function.
 */
export function formatTime(format?: DateFormat | string): Formatter<Date> {
   return (d: Date, locale: Locale) => d.toLocaleString(locale);
}
