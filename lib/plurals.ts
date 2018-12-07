import { LanguageTag, PluralGroups, PluralForm } from './constants';

/**
 * For a given number of items, return the pluralization
 */
type ThresholdSelector = (n: number) => number;

interface PluralRule {
   numbers: number[];
   plurals: ThresholdSelector;
}

type LanguageRules = Map<LanguageTag, PluralRule>;

let pluralSelector: Map<PluralForm, ThresholdSelector> = new Map([
   [PluralForm.One, (n: number) => Number(n > 1)],
   [PluralForm.Two, (n: number) => Number(n != 1)],
   [PluralForm.Asia, (_n: number) => 0],
   [
      PluralForm.Four,
      (n: number) =>
         n % 10 == 1 && n % 100 != 11
            ? 0
            : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
            ? 1
            : 2
   ],

   [PluralForm.Six, (n: number) => (n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2)],

   [
      PluralForm.Wales,
      (n: number) => (n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3)
   ],
   [PluralForm.France, (n: number) => Number(n >= 2)],
   [
      PluralForm.Ireland,
      (n: number) => (n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4)
   ],
   [
      PluralForm.Romania,
      (n: number) =>
         n == 1 ? 0 : n === 0 || (n % 100 > 0 && n % 100 < 20) ? 1 : 2
   ],
   [
      PluralForm.TwentyOne,
      (n: number) =>
         n % 100 == 1
            ? 1
            : n % 100 == 2
            ? 2
            : n % 100 == 3 || n % 100 == 4
            ? 3
            : 0
   ],
   [
      PluralForm.Hebrew,
      (n: number) =>
         n === 1 ? 0 : n === 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3
   ]
]);

function mapTypeRulesToTags() {
   const rules: Map<LanguageTag, PluralRule> = new Map();
   PluralGroups.forEach((value, key) => {
      value.tags.forEach(l => {
         rules.set(l, {
            numbers: value.nr,
            plurals: pluralSelector.get(key)!
         });
      });
   });
   return rules;
}

class PluralResolver {
   constructor(languageUtils, options = {}) {
      this.languageUtils = languageUtils;
      this.options = options;

      this.rules = mapTypeRulesToTags();
   }

   addRule(lng, obj) {
      this.rules[lng] = obj;
   }

   getRule(code) {
      return (
         this.rules[code] ||
         this.rules[this.languageUtils.getLanguagePartFromCode(code)]
      );
   }

   needsPlural(code) {
      const rule = this.getRule(code);

      return rule && rule.numbers.length > 1;
   }

   getPluralFormsOfKey(code, key) {
      const ret = [];

      const rule = this.getRule(code);

      if (!rule) return ret;

      rule.numbers.forEach(n => {
         const suffix = this.getSuffix(code, n);
         ret.push(`${key}${suffix}`);
      });

      return ret;
   }

   getSuffix(code, count) {
      const rule = this.getRule(code);

      if (rule) {
         // if (rule.numbers.length === 1) return ''; // only singular

         const idx = rule.noAbs
            ? rule.plurals(count)
            : rule.plurals(Math.abs(count));
         let suffix = rule.numbers[idx];

         // special treatment for lngs only having singular and plural
         if (
            this.options.simplifyPluralSuffix &&
            rule.numbers.length === 2 &&
            rule.numbers[0] === 1
         ) {
            if (suffix === 2) {
               suffix = 'plural';
            } else if (suffix === 1) {
               suffix = '';
            }
         }

         const returnSuffix = () =>
            this.options.prepend && suffix.toString()
               ? this.options.prepend + suffix.toString()
               : suffix.toString();

         // COMPATIBILITY JSON
         // v1
         if (this.options.compatibilityJSON === 'v1') {
            if (suffix === 1) return '';
            if (typeof suffix === 'number')
               return `_plural_${suffix.toString()}`;
            return returnSuffix();
         } else if (
            /* v2 */ this.options.compatibilityJSON === 'v2' &&
            (rule.numbers.length === 2 && rule.numbers[0] === 1)
         ) {
            return returnSuffix();
         } else if (
            /* v3 - gettext index */ this.options.simplifyPluralSuffix &&
            rule.numbers.length === 2 &&
            rule.numbers[0] === 1
         ) {
            return returnSuffix();
         }
         return this.options.prepend && idx.toString()
            ? this.options.prepend + idx.toString()
            : idx.toString();
      }

      this.logger.warn(`no plural rule found for: ${code}`);
      return '';
   }
}

export default PluralResolver;
