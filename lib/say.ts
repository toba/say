import { AllowedType } from './config';
import { parse } from './icu';
import { config } from './config';

export type Interpolations = { [key: string]: AllowedType };

/**
 * Translate string literals and localize interpolated values.
 */
export function say(literal: string, values: Interpolations) {
   const translation = ''; //getTranslation(key);

   if (translation === null) {
      return translation;
   }
   const placeholders = parse(literal);

   for (const key in values) {
      const [token, formatter] = placeholders.get(key)!;
      literal.replace(token, formatter(values[key], config.locales));
   }
   return literal;
}
