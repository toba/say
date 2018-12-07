import { AllowedType } from './config';
import { getKey } from './keys';
import { getTranslation, interleave } from './translations';
import { getTypeInfo } from './type-info';
import { localize } from './localizers';

/**
 * Translate string literals and localize interpolated values.
 */
export function say(literals: TemplateStringsArray, ...values: AllowedType[]) {
   const key = getKey(literals);
   const translation = getTranslation(key);

   if (translation === null) {
      return translation;
   }
   const typeInfoForValues = literals.slice(1).map(getTypeInfo);
   const localizedValues = values.map((v, i) =>
      localize(v, typeInfoForValues[i])
   );
   return interleave(translation, ...localizedValues);
}

/**
 * Localization tag function singleton.
 */
// export const i18nTag = new Tag();

// if (typeof window !== 'undefined') {
//    window.i18n = i18nTag.i18n;
//    window.i18nConfig = i18nTag.configure;
// }
