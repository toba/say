import { is } from '@toba/tools';
import { Formatter } from './say';
import { Locale } from './constants';

/**
 * Date format name representation within `Intl` library.
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

/**
 * Date digit style within `Intl` library.
 */
export enum DigitStyle {
   /** Number is shown without leading zeros. */
   Numeric = 'numeric',
   /** Number is shown as two digits with leading zero as necessary. */
   TwoDigit = '2-digit'
}

/**
 * Names mapped to `Intl.DateTimeFormatOptions` to produce typical date formats.
 * These may be the third `format` argument in an ICU message string.
 *
 * @example
 * "some text {key, date, monthDay} other"
 * "some text {key2, date, longWithTime} other"
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
   MonthAndYear = 'monthYear',

   /** @example "1356055200" */
   Timestamp = 'timestamp'
}

/**
 * Names mapped to `Intl.DateTimeFormatOptions` to produce typical time formats.
 * These may be the third `format` argument in an ICU message string.
 *
 * @example
 * "some text {key, time, short} other"
 * "some text {key2, time, long} other"
 */
export enum TimeFormat {
   /** @example "7:00 PM" */
   Short = 'short',

   /** @example "7:00:00 PM" */
   Long = 'long'
}

const defaultOptions: Intl.DateTimeFormatOptions = {
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

type FormatOptions = Map<string, Intl.DateTimeFormatOptions>;

/**
 * Time format configurations.
 */
export const timeFormats: FormatOptions = new Map([
   [
      TimeFormat.Short,
      {
         ...defaultOptions,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit
      }
   ],
   [
      TimeFormat.Long,
      {
         ...defaultOptions,
         hour: DigitStyle.Numeric,
         minute: DigitStyle.TwoDigit,
         second: DigitStyle.TwoDigit
      }
   ]
]);

/**
 * Date format configurations.
 */
export const dateFormats: FormatOptions = new Map([
   [
      DateFormat.Short,
      {
         ...defaultOptions,
         year: DigitStyle.Numeric,
         month: DigitStyle.Numeric,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.Long,
      {
         ...defaultOptions,
         weekday: NameStyle.Long,
         year: DigitStyle.Numeric,
         month: NameStyle.Long,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.LongWithTime,
      {
         ...defaultOptions,
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
         ...defaultOptions,
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
         ...defaultOptions,
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
         ...defaultOptions,
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
         ...defaultOptions,
         month: NameStyle.Short,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.MonthAndDay,
      {
         ...defaultOptions,
         month: NameStyle.Long,
         day: DigitStyle.Numeric
      }
   ],
   [
      DateFormat.ShortMonthAndYear,
      {
         ...defaultOptions,
         year: DigitStyle.Numeric,
         month: NameStyle.Long
      }
   ],
   [
      DateFormat.MonthAndYear,
      {
         ...defaultOptions,
         year: DigitStyle.Numeric,
         month: NameStyle.Long
      }
   ]
]);

/**
 * Lookup format and build function.
 */
export const formatDate = (format?: DateFormat | string): Formatter<Date> =>
   makeFormatter(dateFormats, format);

/**
 * Lookup format and build function.
 */
export const formatTime = (format?: DateFormat | string): Formatter<Date> =>
   makeFormatter(timeFormats, format);

function makeFormatter<T extends DateFormat | TimeFormat | string>(
   formatList: FormatOptions,
   format?: T
): Formatter<Date> {
   let options: Intl.DateTimeFormatOptions | undefined;

   if (!is.empty(format)) {
      const f = format.toLowerCase();

      if (formatList.has(f)) {
         options = formatList.get(f);
      } else {
         switch (f) {
            case DateFormat.ISO8601:
               return (d: Date) => d.toISOString();
            case DateFormat.RFC1123:
               return (d: Date) => d.toUTCString();
            case DateFormat.Timestamp:
               return (d: Date) => d.getTime().toString();
            default:
               throw Error(`Date/time format "${format}" is not recognized`);
         }
      }
   }
   return (d: Date, locale: Locale) => d.toLocaleString(locale, options);
}
