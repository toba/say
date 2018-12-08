import { Formatter } from './icu';

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
   ShortDate = 'd',

   /** @example "Thursday, December 20, 2012" */
   LongDate = 'D',

   /** @example "Thursday, December 20, 2012, 7:00 PM" */
   LongDateAndTime = 'f',

   /** @example "Thursday, December 20, 2012, 7:00:00 PM" */
   LongDateAndExactTime = 'F',

   /** @example "12/20/2012, 7:00 PM" */
   ShortDateAndTime = 'g',

   /** @example "12/20/2012, 7:00:00 PM" */
   ShortDateAndExactTime = 'G',

   /** @example "Dec 20" */
   ShortMonthAndDay = 'm',

   /** @example "December 20" */
   MonthAndDay = 'M',

   /** @example "2012-12-20T18:00:00.000Z" */
   //ISO8601also = 'o',

   /** @example "2012-12-20T18:00:00.000Z" */
   ISO8601 = 'iso8601',

   /** @example "Thu, 20 Dec 2012 18:00:00 GMT" */
   //RFC1123also = 'r',

   /** @example "Thu, 20 Dec 2012 18:00:00 GMT" */
   RFC1123 = 'rfc1123',

   /** @example "7:00 PM" */
   TimeOnly = 't',

   /** @example "7:00:00 PM" */
   ExactTime = 'T',

   /** @example "Dec 2012" */
   ShortMonthAndYear = 'y',

   /** @example "December 2012" */
   MonthAndYear = 'Y'
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
 * Date format configurations.
 */
export const dateFormats: Map<string, Intl.DateTimeFormatOptions> = new Map([
   [
      DateFormat.ShortDate,
      {
         ...defaultDateFormat,
         year: DigitStyle.Numeric,
         month: DigitStyle.Numeric,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.LongDate,
      {
         ...defaultDateFormat,
         weekday: NameStyle.Long,
         year: DigitStyle.Numeric,
         month: NameStyle.Long,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.LongDateAndTime,
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
      DateFormat.LongDateAndExactTime,
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
      DateFormat.ShortDateAndTime,
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
      DateFormat.ShortDateAndExactTime,
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
      DateFormat.TimeOnly,
      {
         ...defaultDateFormat,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit
      }
   ],
   [
      DateFormat.ExactTime,
      {
         ...defaultDateFormat,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit,
         second: DigitStyle.TwoDigit
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
export function formatDate(format: DateFormat | string): Formatter<Date> {
   return (d: Date) => d.toLocaleString('en');
}

/**
 * Lookup format and build function.
 */
export function formatTime(format: DateFormat | string): Formatter<Date> {
   return (d: Date) => d.toLocaleString('en');
}
