import { Formatter } from '../say';
import { Locale } from '../constants';

const re = /(\w+)[\r\n\s]*{([^}]+)}/g;

/**
 * Parse map of plural rules from ICU format string.
 *
 * @example
 *  {gender, select,
 *    male {He}
 *    female {She}
 *    other {They}
 *  } will respond shortly.
 */
export function parse(format: string): Map<string, string> {
   re.lastIndex = 0;
   const options: Map<string, string> = new Map();
   let matches: RegExpExecArray | null;

   while ((matches = re.exec(format)) !== null) {
      const [rule, type, text] = matches;
      options.set(type, text);
   }
   return options;
}

/**
 * Lookup style and build function.
 *
 * @example
 *  {gender, select,
 *    male {He}
 *    female {She}
 *    other {They}
 *  } will respond shortly.
 */
export function formatSelect(format: string): Formatter<string> {
   const options = parse(format);

   return (key: string, locale: Locale) => {
      if (options.has(key)) {
         text = options.get(exact)!;
      } else {
         const rules = getRules(locale);
         const type = rules.select(count);
         text = options.get(type);
      }
      // TODO: fallback?
      return text !== undefined
         ? text.replace('#', count.toLocaleString(locale))
         : '';
   };
}
