import { is } from '@toba/tools';
import { Locale, CurrencyCode } from '..';
import { Formatter } from '../say';

/**
 * Possible values of `style` property on `Intl.NumberFormatOptions`.
 */
export enum NumberStyle {
   Decimal = 'decimal',
   Currency = 'currency',
   Percent = 'percent'
}

/**
 * Possible values of `currencyDisplay` property on `Intl.NumberFormatOptions`.
 */
export enum CurrencyDisplay {
   /** Use a localized currency symbol such as € (the default) */
   Symbol = 'symbol',
   /** Use the ISO currency code */
   Code = 'code',
   /** Use a localized currency name such as "dollar" */
   Name = 'name'
}

type FormatOptions = Map<string, Intl.NumberFormatOptions>;

const defaultOptions: Intl.NumberFormatOptions = {
   minimumFractionDigits: 0,
   maximumFractionDigits: 3
};

/**
 * Number format configurations.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
 */
export const numberFormats: FormatOptions = new Map([
   [
      NumberStyle.Percent,
      {
         ...defaultOptions,
         style: NumberStyle.Percent
      }
   ]
]);

/**
 * Regular expression to match all supported currency codes.
 * @example
 * /^(USD|EUR)$/i
 */
let currencyPattern: RegExp;
let patternReady = false;

export const isCurrencyCode = (code?: string): code is string => {
   if (!patternReady) {
      currencyPattern = new RegExp(
         `^(${Object.values(CurrencyCode).join('|')})$`,
         'i'
      );
      patternReady = true;
   }
   return code === undefined ? false : currencyPattern.test(code);
};

/**
 * Lookup style and build function.
 */
export function formatNumber(format?: string): Formatter<number> {
   let options = defaultOptions;

   if (is.numeric(format)) {
      const places: number = parseInt(format);
      options = {
         ...options,
         minimumFractionDigits: places,
         maximumFractionDigits: places
      };
   } else if (isCurrencyCode(format)) {
      options = {
         ...options,
         style: NumberStyle.Currency,
         currency: format,
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      };
   } else if (format === NumberStyle.Currency) {
      options = {
         ...options,
         style: NumberStyle.Currency,
         minimumFractionDigits: 2,
         maximumFractionDigits: 2
      };
   } else if (!is.empty(format)) {
      if (numberFormats.has(format)) {
         options = numberFormats.get(format)!;
      } else {
         throw Error(`Number format "${format}" is not recognized`);
      }
   }
   return (n: number, locale: Locale) => n.toLocaleString(locale, options);
}