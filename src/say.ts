import { is } from '@toba/tools'
import { AllowedType, config } from './config'
import { formatNumber } from './format/number'
import { formatDate, formatTime } from './format/date'
import { formatPlural } from './format/plural'
import { Locale } from './constants'
import { getTranslation } from './translation'
import { formatSelect } from './format/select'

/**
 * Method that translates a value to a given locale.
 */
export type Formatter<T> = (value: T, locale: Locale | Locale[]) => string

/**
 * Values supplied to replace placeholders in translated string literal.
 */
interface Interpolations {
   [key: string]: AllowedType
}

/**
 * Placeholders found within a template string. A formatter for the type and
 * format is paired with the string matching the full placeholder which is keyed
 * to the placeholder key.
 *
 * @example
 * "text {key, type, format} more text"
 * => Map<'key', ['{key, type, format}', parsePlaceholder(type, format)]>
 */
type Placeholders = Map<string, [string, Formatter<AllowedType>]>

export const enum ValueType {
   Date = 'date',
   Time = 'time',
   Plural = 'plural',
   Number = 'number',
   Ordinal = 'ordinal',
   Duration = 'duration',
   Spellout = 'spellout',
   Select = 'select',
   SelectOrdinal = 'selectordinal'
}

/**
 * Map literal translation strings to their deconstructed, keyed placeholders
 * with localization functions.
 */
const cache: Map<string, Placeholders | null> = new Map()

/**
 * Pattern matching a standard ICU placeholder.
 * @example
 * {key, type, format}
 * {key2}
 * {key3, type3}
 */
const re = /{(\w+)(,\s+(\w+)(,\s+(\w+))?)?}/g

/**
 * Clear cached translation and localization functions. Cache will be lazily
 * rebuilt in `getPlaceholders()`.
 */
export function resetCache() {
   cache.clear()
}

/**
 * Compile key matcher and formatter for ICU message placeholder. This will be
 * cached so different values can quickly be interpolated with the same format
 * string.
 */
export function makePlaceholder(
   type: string,
   format?: string
): Formatter<AllowedType> {
   if (is.empty(type)) {
      return (v: string) => v
   }
   switch (type) {
      case ValueType.Date:
         return formatDate(format)
      case ValueType.Number:
         return formatNumber(format)
      case ValueType.Plural:
         if (is.value<string>(format)) {
            return formatPlural(format)
         }
         // TODO: verify break since this previously allowed fall-through
         break
      case ValueType.Select:
         if (is.value<string>(format)) {
            return formatSelect(format)
         }
         // TODO: verify break since this previously allowed fall-through
         break
      case ValueType.Time:
         return formatTime(format)
      default:
         break
   }
   throw Error(`Unsupported type "${type}" and format "${format}"`)
}

/**
 * Parse placeholders from literal.
 * @param key Translation key in localized files
 * @param literal Translated text from localized files
 *
 * @see https://formatjs.io/guides/message-syntax/
 * @see https://format-message.github.io/icu-message-format-for-translators/
 * @see https://format-message.github.io/icu-message-format-for-translators/editor.html
 * @example
 * 'Your total is {total, number, usd}'
 */
export function getPlaceholders(
   key: string,
   literal: string
): Placeholders | null {
   if (cache.has(key)) {
      return cache.get(key)!
   }
   re.lastIndex = 0
   const ph: Placeholders = new Map()
   let matches: RegExpExecArray | null

   while ((matches = re.exec(literal)) !== null) {
      const [placeholder, phKey, , type, , format] = matches
      const formatter = makePlaceholder(type, format)
      ph.set(phKey, [placeholder, formatter])
   }
   if (ph.size > 0) {
      cache.set(key, ph)
      return ph
   }
   cache.set(key, null)
   return null
}

/**
 * Say the translated text matching the given key.
 * @param key Translation key in localized files
 * @param values Optional values to replace placeholders in translated text
 */
export function say(key: string, values?: Interpolations): string | undefined {
   let literal = getTranslation(key)

   if (literal === undefined) return undefined

   const placeholders = getPlaceholders(key, literal)

   if (placeholders !== null) {
      // TODO: show some kind of error
      if (values === undefined) return literal

      // iterate values and invoke placeholder methods
      placeholders.forEach((formatter, key) => {
         const v = values[key]
         const ph = formatter[0]
         const fn = formatter[1]
         const text = fn(v, [config.locale, config.fallbackLocale])

         literal = literal!.replace(ph, text)
      })
   }
   return literal
}

// test
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js
