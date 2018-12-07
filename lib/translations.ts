import { is } from '@toba/tools';
import { AllowedType, Configuration, config } from './config';
import { TypeInfo } from './type-info';

export interface Translatable extends TypeInfo {
   value: AllowedType;
}

export interface Translation {
   config: Configuration;
   translatedKey: string;
}

/**
 * Cached translations without interpolations.
 */
const cache: Map<string, string> = new Map();

/**
 * Substitute values into numered placeholders within string literal.
 * @example
 * interleave('{0} {1}!', 'hello', 'world') == 'hello world!'
 */
export const interleave = (
   template: string,
   ...values: AllowedType[]
): string =>
   template.replace(/\{(\d)}/g, (_, index) => values[Number(index)].toString());

export function clearCache() {
   cache.clear();
}

/**
 * Retrieve translated format string (before interpolations).
 * @see http://userguide.icu-project.org/formatparse/messages
 */
export function getTranslation(key: string): string | null {
   if (cache.has(key)) {
      return cache.get(key)!;
   }
   const translation = makeTranslation(key);

   if (is.value(translation)) {
      cache.set(key, translation);
   }

   return translation;
}

export function makeTranslation(key: string) {
   const translations = config.translations;

   return is.defined(translations, key) ? translations[key] : null;
}
