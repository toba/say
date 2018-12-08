import { Formatter } from './icu';
import { LanguageTag } from './constants';

/**
 * Types of plurals supported in different languages.
 *
 * `Intl.PluralRules([lang]).select([count])` returns the type for a given
 * language and count.
 *
 * English, for example has only two types, `one` and `other`. One item is
 * singular but zero or more than one are plural.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules/select
 * @see https://tc39.github.io/ecma402/#pluralrules-objects
 */
export enum PluralType {
   /**
    * Specific grammar for zero items (as in Arabic and Latvian).
    */
   Zero = 'zero',

   /**
    * Specific grammar for one item. Many languages, but not all, use this type.
    * (Many popular Asian languages, such as Chinese and Japanese, do not.)
    */
   One = 'one',

   /**
    * Specific grammar for two items (as in Arabic and Welsh).
    */
   Two = 'two',

   /**
    * Specific grammar for a small number of items. For some languages this is
    * used for 2-4 items, for some 3-10 items, and other languages have even
    * more complex rules.
    */
   Few = 'few',

   /**
    * Specific grammar for a larger number of items (as in Arabic, Polish, and
    * Russian).
    */
   Many = 'many',

   /**
    * Used if the value doesn't match one of the other plural categories. This
    * is used for "plural" for languages (such as English) that have a simple
    * "singular" versus "plural" dichotomy.
    */
   Other = 'other'
}

/**
 * Lookup style and build function.
 *
 * @example
 * You have {itemCount, plural,
 *    =0 {no items}
 *    one {# item}
 *    other {# items}
 * }
 */
export function formatPlural(format: string): Formatter<string> {
   const plurals = format.split(/\s*{|}[\s\r\n]*/);
   return (t: string) => t;
}

//interface PluralMap {

// formatjs format
// https://formatjs.io/guides/message-syntax/
//
// You have {itemCount, plural,
//    =0 {no items}
//    one {# item}
//    other {# items}
// }.
//
// Your total is {total, number, usd}
