import { pattern as typeInfoPattern } from './type-info';

/**
 * Translated format strings matched to template literal arrays.
 * @example
 * '{0} has {1} in the bank' => ',  has , :c in the bank'
 */
const cache: Map<string, string> = new Map();

/**
 * Convert template literals to a format string. The format string differs from
 * the standard by having a `$` prefix on each numbered token.
 * @example
 * makeKey(['', ' has ', ':c in the bank']) == '{0} has {1} in the bank'
 */
export function makeKey(literals: TemplateStringsArray | string[]): string {
   /**
    * Remove supplemental type information from template string.
    */
   const stripType = (lit: string) => lit.replace(typeInfoPattern, '');
   const lastPartialKey = stripType(literals[literals.length - 1]);

   return literals
      .slice(0, -1)
      .reduceRight(
         (text, lit, i) => `${stripType(lit)}{${i}}${text}`,
         lastPartialKey
      )
      .replace(/\r\n/g, '\n');
}

/**
 * Build generic format string from template to use as key.
 * @example
 * getKey(['', ' has ', ':c in the bank']) == '{0} has {1} in the bank'
 */
export function getKey(literals: TemplateStringsArray | string[]): string {
   const key = literals.join();

   if (cache.has(key)) {
      return cache.get(key)!;
   }
   const formatString = makeKey(literals);
   cache.set(key, formatString);
   return formatString;
}
