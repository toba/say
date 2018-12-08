import { AllowedType } from './config';

// International Components for Unicode
// https://blog.crowdin.com/2016/11/09/icu-syntax-in-crowdin/
// https://help.phraseapp.com/translate-website-and-app-content/use-icu-message-format/icu-message-format
// https://medium.com/@jamuhl/we-now-fully-support-icu-format-at-https-locize-com-d2a6775ed06f

type Formatter = (value: AllowedType) => string;
type MakeFormatter<U> = (style: U) => Formatter;
type Placeholders<T> = Map<RegExp, Formatter>;

interface Placeholder<T> {
   key: string;
   re: RegExp;
   fn: Formatter;
}

enum ValueType {
   Date = 'date',
   Time = 'time',
   Plural = 'plural',
   Number = 'number'
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
 * @example
 * 'Your total is {total, number, usd}'
 */
function parse<T>(literal: string): Map<string, Placeholders<T>> | null {
   return null;
}

function parsePlaceholder(token: string): [RegExp, Formatter] {
   return [];
}
