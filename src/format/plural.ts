import { Formatter } from '../say';
import { Locale } from '../constants';

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
export const enum PluralType {
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

const re = /(zero|one|two|few|many|other|=\d+)[\r\n\s]*{([^}]+)}/g;
const ruleCache: Map<Locale, Intl.PluralRules> = new Map();

/**
 * Parse map of plural rules from ICU format string.
 *
 * @example
 * You have {itemCount, plural,
 *    =0 {no items}
 *    one {# item}
 *    other {# items}
 * }
 */
export function parse(format: string): Map<PluralType | string, string> {
   re.lastIndex = 0;
   const plurals: Map<PluralType | string, string> = new Map();
   let matches: RegExpExecArray | null;

   while ((matches = re.exec(format)) !== null) {
      const [, type, text] = matches;
      plurals.set(type, text);
   }
   return plurals;
}

/**
 * Retrieve pluralization rules from cache or from `Intl` library.
 */
function getRules(
   locale: Locale,
   options?: Intl.PluralRulesOptions
): Intl.PluralRules {
   if (ruleCache.has(locale)) {
      return ruleCache.get(locale)!;
   }
   const rules = new Intl.PluralRules(locale, options);
   ruleCache.set(locale, rules);
   return rules;
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
export function formatPlural(format: string): Formatter<number> {
   const plurals = parse(format);

   return (count: number, locale: Locale) => {
      const exact = '=' + count;
      let text: string | undefined;

      if (plurals.has(exact)) {
         text = plurals.get(exact)!;
      } else {
         const rules = getRules(locale);
         const type = rules.select(count);
         text = plurals.get(type);
      }
      // TODO: fallback?
      return text !== undefined
         ? text.replace('#', count.toLocaleString(locale))
         : '';
   };
}
