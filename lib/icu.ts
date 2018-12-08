import { is } from '@toba/tools';
import { AllowedType } from './config';
import { formatNumber } from './format-number';
import { formatDate, formatTime } from './format-date';
import { formatPlural } from './format-plural';

// International Components for Unicode
// https://blog.crowdin.com/2016/11/09/icu-syntax-in-crowdin/
// https://help.phraseapp.com/translate-website-and-app-content/use-icu-message-format/icu-message-format
// https://medium.com/@jamuhl/we-now-fully-support-icu-format-at-https-locize-com-d2a6775ed06f

export type Formatter<T> = (value: T) => string;
//type MakeFormatter<U> = (style: U) => Formatter;
/**
 * Placeholders found within a template string.
 */
type Placeholders = Map<RegExp, Formatter<AllowedType>>;

enum ValueType {
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
 * Substitute values into keyed placeholders within string literal.
 * @example
 * interleave('{0} {1}!', 'hello', 'world') == 'hello world!'
 */
export const interleave = (
   template: string,
   values: { [key: string]: AllowedType }
): string => {
   for (const key in values) {
      template.replace(new RegExp(`{${key}[^}]+}`), values[key].toString());
   }
   return template;
};

/**
 * Parse placeholders from literal.
 * https://formatjs.io/guides/message-syntax/
 * @see https://format-message.github.io/icu-message-format-for-translators/
 * @see https://format-message.github.io/icu-message-format-for-translators/editor.html
 * @example
 * 'Your total is {total, number, usd}'
 */
function parse(literal: string): Map<string, Placeholders> | null {
   return null;
}

/**
 * Compile key matcher and formatter for ICU message placeholder. This will be
 * cached so different values can quickly be interpolated with the same format
 * string.
 */
function parsePlaceholder(token: string): [RegExp, Formatter<AllowedType>] {
   const [key, type, format] = token.split(',');
   const re = new RegExp(`{${key}[^}]+}`);

   switch (type) {
      case ValueType.Date:
         return [re, formatDate(format)];
      case ValueType.Number:
         return [re, formatNumber(format)];
      case ValueType.Plural:
         return [re, formatPlural(format)];
      case ValueType.Time:
         return [re, formatTime(format)];
   }
   throw Error(`Unsupported type "${type}'`);
}

// test
// https://github.com/format-message/format-message/blob/master/packages/format-message-parse/__tests__/index.spec.js
