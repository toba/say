import { is } from '@toba/tools';
import { AllowedType } from './config';
import { formatNumber } from './format-number';
import { formatDate, formatTime } from './format-date';
import { formatPlural } from './format-plural';
import { Locale } from './constants';

// International Components for Unicode
// https://blog.crowdin.com/2016/11/09/icu-syntax-in-crowdin/
// https://help.phraseapp.com/translate-website-and-app-content/use-icu-message-format/icu-message-format
// https://medium.com/@jamuhl/we-now-fully-support-icu-format-at-https-locize-com-d2a6775ed06f

export type Formatter<T> = (value: T, locale: Locale | Locale[]) => string;

/**
 * Placeholders found within a template string. A formatter for the type and
 * format is paired with the string matching the full placeholder which is keyed
 * to the placeholder key.
 *
 * @example
 * "text {key, type, format} more text"
 * => Map<'key', ['{key, type, format}', parsePlaceholder(type, format)]>
 */
type Placeholders = Map<string, [string, Formatter<AllowedType>]>;

export enum ValueType {
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

const cache: Map<string, Placeholders> = new Map();

/**
 * Pattern matching a standard ICU placeholder.
 * @example
 * {key, type, format}
 * {key2}
 * {key3, type3}
 */
const re = /{(\w+)(,\s+(\w+)(,\s+(\w+))?)?}/g;

/**
 * Parse placeholders from literal.
 * @see https://formatjs.io/guides/message-syntax/
 * @see https://format-message.github.io/icu-message-format-for-translators/
 * @see https://format-message.github.io/icu-message-format-for-translators/editor.html
 * @example
 * 'Your total is {total, number, usd}'
 */
export function parse(literal: string): Placeholders {
   if (cache.has(literal)) {
      return cache.get(literal)!;
   }
   re.lastIndex = 0;
   const ph: Placeholders = new Map();
   let matches: RegExpExecArray | null;

   while ((matches = re.exec(literal)) !== null) {
      const [placeholder, key, , type, , format] = matches;
      const formatter = parsePlaceholder(type, format);
      ph.set(key, [placeholder, formatter]);
   }
   cache.set(literal, ph);
   return ph;
}

/**
 * Compile key matcher and formatter for ICU message placeholder. This will be
 * cached so different values can quickly be interpolated with the same format
 * string.
 */
export function parsePlaceholder(
   type: string,
   format?: string
): Formatter<AllowedType> {
   switch (type) {
      case ValueType.Date:
         return formatDate(format);
      case ValueType.Number:
         return formatNumber(format);
      case ValueType.Plural:
         if (is.value(format)) {
            return formatPlural(format);
         }
      case ValueType.Time:
         return formatTime(format);
   }
   throw Error(`Unsupported type "${type}" and format "${format}"`);
}

// test
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js
