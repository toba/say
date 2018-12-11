import { Formatter } from '../say';
import { Locale } from '../constants';

const re = /(\w+)[\r\n\s]*{([^}]+)}/g;

/**
 * Create map of selection options from ICU format string.
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
         return options.get(key)!;
      } else {
         return '';
      }
   };
}
