import { clone, mergeAll } from '@toba/tools';
import { CurrencyCode } from './constants';

/**
 * Basic types supported by standard internationalization library.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
export enum BasicType {
   Date = 'date',
   Number = 'number',
   Text = 'string'
}

/**
 * Types supported by internationalization library.
 */
export type AllowedType = string | number | Date;

export type StringFormat = any;

/**
 * Method that formats a value according to the locale and style options.
 * This matches the signature of `es2015-i18n-tag`.
 * @see https://github.com/skolmer/es2015-i18n-tag
 */
export type Formatter<T extends AllowedType> = (
   locales: string | string[] | undefined,
   options: T extends Date
      ? Intl.DateTimeFormat
      : T extends number
      ? Intl.NumberFormat
      : { [key: string]: StringFormat },
   value: T
) => string;

/**
 * Keyed styled formatters for a basic value type.
 */
export interface StyleFormatters<T extends AllowedType> {
   [style: string]: Formatter<T>;
}

/**
 * Named style formatters for basic value types.
 */
export interface BasicTypeStyles {
   [BasicType.Date]?: StyleFormatters<Date>;
   [BasicType.Number]?: StyleFormatters<number>;
   [BasicType.Text]?: StyleFormatters<string>;
}

export interface Configuration {
   /**
    * BCP 47 language tag or tags.
    */
   locales?: string | string[];
   /**
    * An object that contains translations as key-value-pairs
    */
   translations?: { [key: string]: string };
   /**
    * Default number format.
    */
   [BasicType.Number]?: Intl.NumberFormatOptions;
   /**
    * Default date format.
    */
   [BasicType.Date]?: Intl.DateTimeFormatOptions;
   /**
    * Default text format.
    */
   [BasicType.Text]?: StringFormat;
   /**
    * Optionally defined custom formatters for date, number and text suffix
    * functions.
    *
    * @example `${ new Date() }:[BasicType]([style])`
    */
   formatters?: BasicTypeStyles;
}

const defaultConfig: Configuration = Object.freeze({
   locales: undefined,
   translations: {},
   [BasicType.Number]: {
      currency: CurrencyCode.USDollar
   },
   [BasicType.Date]: {},
   [BasicType.Text]: {}
});

export let config = clone(defaultConfig);

/**
 * Update configuration.
 */
export function configure(changes: Configuration) {
   config = mergeAll(config, changes);
   return config;
}
