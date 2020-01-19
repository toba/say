import { merge } from '@toba/tools'
import { Locale, CurrencyCode } from './constants'
import { reset as resetTranslations } from './translation'

/**
 * Basic types supported by standard internationalization library.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
export const enum BasicType {
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
   [key: string]: string
}

/**
 * Types supported by internationalization library.
 */
export type AllowedType = string | number | Date

export type StringFormat = any

export interface Configuration {
   /**
    * BCP 47 language tag or tags.
    */
   locale: Locale
   /**
    * Translation locale to use when there is no translation for the preferred
    * locale.
    */
   fallbackLocale: Locale
   /**
    * Currency to use if not specified in format string (first choice) and no
    * match to the current locale is defined (second choice) in `constants`.
    */
   fallbackCurrency: CurrencyCode
   /**
    * Combined translation content from sources mapped to locale.
    */
   translations: Map<Locale, Translations>
   /**
    * Path prepended to all added source paths (must include trailing slash).
    */
   basePath: string
   /**
    * Translations file paths mapped to which locales have beeen loaded from
    * that source.
    */
   sources: Map<string, Set<Locale>>
}

const defaultConfig = (): Configuration => ({
   locale: Locale.English,
   fallbackLocale: Locale.English,
   fallbackCurrency: CurrencyCode.USDollar,
   basePath: '/assets/i18n/',
   translations: new Map(),
   sources: new Map()
})

/**
 * Global configuration cache that should behave as a singleton.
 */
export let config = defaultConfig()

export function reset(): Configuration {
   config = defaultConfig()
   resetTranslations()
   return config
}

/**
 * Set path used for translation sources.
 * @param path Path prepended to all source paths
 */
export function setBasePath(path: string): Configuration {
   config.basePath = path.replace(/\/+$/, '') + '/'
   return config
}

/**
 * @param locale Locale to use for subsequent translation lookups
 * @param tx Optional translations for the new locale
 */
export function setTranslations(locale: Locale, tx?: Translations) {
   config.locale = locale
   if (tx !== undefined) config.translations.set(locale, tx)
}

/**
 * Add new set of translations to existing locale cache or create new locale
 * entry with the translations.
 */
export function addTranslations(locale: Locale, tx: Translations) {
   if (config.translations.has(locale)) {
      const existing = config.translations.get(locale)!
      const merged = merge(existing, tx)
      config.translations.set(locale, merged)
   } else {
      setTranslations(locale, tx)
   }
}
