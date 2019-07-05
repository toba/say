import { Locale, CurrencyCode } from './constants';

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
 * Translation content literal mapped to a key.
 * @example
 * {
 *    AccountBalance: "Hello {name}, you have {balance, number, currency} in your account."
 * }
 */
export interface Translations {
   [key: string]: string;
}

/**
 * Types supported by internationalization library.
 */
export type AllowedType = string | number | Date;

export type StringFormat = any;

export interface Configuration {
   /**
    * BCP 47 language tag or tags.
    */
   locale: Locale;
   /**
    * Translation locale to use when there is no translation for the preferred
    * locale.
    */
   fallbackLocale: Locale;
   /**
    * Currency to use if not specified in format string (first choice) and no
    * match to the current locale is defined (second choice) in `constants`.
    */
   fallbackCurrency: CurrencyCode;
   /**
    * Relative file path to folder containing translation files.
    */
   path: string;
   /**
    * Translation content mapped to locale.
    */
   translations: Map<Locale, Translations>;
   /**
    * Whether translations are loaded.
    */
   ready: boolean;
}

const defaultConfig = (): Configuration => ({
   locale: Locale.English,
   fallbackLocale: Locale.English,
   fallbackCurrency: CurrencyCode.USDollar,
   path: './locale',
   translations: new Map(),
   ready: false
});

/**
 * Global configuration cache that should behave as a singleton.
 */
export let config = defaultConfig();

/**
 * @param path Path to locale translation files
 */
export function setPath(path: string): Configuration {
   config.path = path;
   return config;
}

/**
 * @param locale Locale to use for subsequent translation lookups
 * @param tx Optional translations for the new locale
 */
export function setTranslations(locale: Locale, tx?: Translations) {
   config.locale = locale;
   if (tx !== undefined) {
      config.translations.set(locale, tx);
   }
}
