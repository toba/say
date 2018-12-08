import { Formatter } from './icu';

/**
 * Number format configurations.
 */
export const numberFormats: Map<string, Intl.NumberFormatOptions> = new Map();

/**
 * Lookup style and build function.
 */
export function formatNumber(format: string): Formatter<number> {
   return (n: number) => n.toLocaleString('en');
}
