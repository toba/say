import { is } from '@toba/tools';
import { Formatter } from './icu';

export enum NumberStyle {
   Decimal = 'decimal',
   Currency = 'currency',
   Percent = 'percent'
}

/**
 * Number format configurations.
 */
export const numberFormats: Map<string, Intl.NumberFormatOptions> = new Map();

const defaultNumberFormats: Intl.NumberFormatOptions = {
   minimumFractionDigits: 0,
   maximumFractionDigits: 3
};

/**
 * Lookup style and build function.
 */
export function formatNumber(format: string): Formatter<number> {
   if (is.numeric(format)) {
      const places: number = parseInt(format);
      return (n: number) =>
         n.toLocaleString(config.locales, {
            ...defaultNumberFormats,
            style: NumberStyle.Decimal,
            minimumFractionDigits: places,
            maximumFractionDigits: places
         });
   }
   return (n: number) =>
      n.toLocaleString(config.locales, {
         ...defaultNumberFormats,
         style: NumberStyle.Decimal,
         minimumFractionDigits: 0,
         maximumFractionDigits: 3
      });
}
