import { Locale } from './constants';

/**
 * Basic types supported by standard internationalization library.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
export enum BasicType {
   Date = 'date',
   Number = 'number',
   Text = 'string'
}

export type Translations = { [key: string]: string };

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
   fallbackLocale: Locale;
   path: string;
   translations: Map<Locale, Translations>;
}

const defaultConfig = (): Configuration => ({
   locale: Locale.English,
   fallbackLocale: Locale.English,
   path: './locale',
   translations: new Map()
});

export function setPath(path: string): Configuration {
   config.path = path;
   return config;
}

export function setTranslations(locale: Locale, tx?: Translations) {
   config.locale = locale;
   if (tx !== undefined) {
      config.translations.set(locale, tx);
   }
}

export let config = defaultConfig();
