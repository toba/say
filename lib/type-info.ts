import { is } from '@toba/tools';
import { LocalizeType } from './localizers';

export interface TypeInfo {
   type: LocalizeType;
   /** Style parameter for the data type. */
   style?: string;
}

/**
 * Template literal parameter type information matched to literal strings.
 */
const cache: Map<string, TypeInfo> = new Map();

/**
 * Capture format code and optional style from a template literal token suffix.
 * @example
 * `This text ${value}:n(2)` => ["n", "2"]
 */
export const pattern = /^:([a-z])(\(([^)]+)\))?/;

/**
 * Build type information from template literal token suffix.
 */
export function getTypeInfo(literal: string): TypeInfo {
   if (cache.has(literal)) {
      return cache.get(literal)!;
   }
   const match = pattern.exec(literal);
   const info: TypeInfo = is.array(match)
      ? { type: match[1] as LocalizeType, style: match[3] }
      : { type: LocalizeType.String };

   cache.set(literal, info);

   return info;
}
