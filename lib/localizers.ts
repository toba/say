import { is, mergeAll, clone } from '@toba/tools';
import { TypeInfo } from './type-info';
import { DateFormat, dateFormats } from './format-date';
import {
   config,
   BasicType,
   AllowedType,
   BasicTypeStyles,
   StyleFormatters,
   Formatter
} from './config';

/**
 * Type of localization to perform on a token applied as a suffix to the value
 * token within a template literal. The localization can accept an argument
 * specifying a `style`.
 * @example
 * `text ${value}:[LocalizeType]([style]) text`
 * `text ${value}:t(G) text`
 */
export enum LocalizeType {
   String = 's',
   Number = 'n',
   Date = 't',
   Currency = 'c',
   Percent = 'p'
}

export enum NumberStyle {
   Decimal = 'decimal',
   Currency = 'currency',
   Percent = 'percent'
}

/**
 * Localize single value using type information to lookup locally defined
 * localizer method. The value is then substituted back into a template
 * literal string.
 */
export function localize(
   value: AllowedType,
   { type, style }: TypeInfo
): string {
   if (localizers.has(type)) {
      const localizer = localizers.get(type)!;
      return localizer(value, style);
   }
   throw new Error(`Type '${type}' is not supported for localization`);
}

/**
 * Throw an error if value is not of the expected type.
 */
export function assertType(type: LocalizeType, v: AllowedType) {
   let validate: (v: AllowedType) => boolean = v => true;
   let name: string = '';

   switch (type) {
      case LocalizeType.Number:
      case LocalizeType.Currency:
      case LocalizeType.Percent:
         validate = is.number;
         name = is.Type.Number;
         break;
      case LocalizeType.Date:
         validate = is.date;
         name = 'date';
         break;
   }
   if (!validate(v)) {
      throw Error(`Value is not a ${name}. Its type is ${typeof v}`);
   }
}

/**
 * Apply a custom type style, pre-empting the standard formats.
 * @param style Name of particular style formatter for a basic type.
 */
export function applyStyleFormat<T extends AllowedType>(
   type: BasicType,
   style: DateFormat | string,
   value: T
): string | null {
   if (!is.object<BasicTypeStyles>(config.formatters)) {
      return null;
   }
   const typeStyles = config.formatters[type];

   if (!is.object<StyleFormatters<T>>(typeStyles)) {
      return null;
   }
   const formatter: Formatter<T> = typeStyles[style];

   if (!is.value(formatter)) {
      return null;
   }
   return formatter(config.locales, config[type], value);
}

/**
 * Method to select and execute a formatter.
 */
export type FormatSelector<T> = (value: T, style?: string) => string;

/**
 * Formatters for basic localization types.
 */
export const localizers: Map<
   LocalizeType,
   FormatSelector<AllowedType>
> = new Map();

localizers
   .set(LocalizeType.String, (d: Date, style: string) => {
      if (!is.empty(style)) {
         const formatted = applyStyleFormat(BasicType.Text, style, d);
         if (formatted !== null) {
            return formatted;
         }
      }
      return d.toLocaleString(config.locales);
   })

   .set(LocalizeType.Number, (n: number, style: string) => {
      assertType(LocalizeType.Number, n);

      if (is.value<string>(style)) {
         const fractionalDigits = parseInt(style);
         if (!isNaN(fractionalDigits)) {
            return n.toLocaleString(config.locales, {
               ...config.number,
               style: NumberStyle.Decimal,
               minimumFractionDigits: fractionalDigits,
               maximumFractionDigits: fractionalDigits
            });
         }
         const formatted = applyStyleFormat(BasicType.Number, style, n);
         if (formatted !== null) {
            return formatted;
         }
      }
      return n.toLocaleString(config.locales, {
         ...config.number,
         style: NumberStyle.Decimal,
         minimumFractionDigits: 0,
         maximumFractionDigits: 3
      });
   })

   .set(LocalizeType.Date, (d: Date, style: DateFormat) => {
      assertType(LocalizeType.Date, d);

      if (is.value(style)) {
         switch (style.toUpperCase()) {
            case DateFormat.RFC1123:
               return d.toUTCString();
            case DateFormat.ISO8601:
               return d.toISOString();
         }

         if (dateFormats.has(style)) {
            // standard style has been defined
            const options = dateFormats.get(style)!;

            return d.toLocaleString(
               config.locales,
               is.object(config.date) ? mergeAll(config.date, options) : options
            );
         } else {
            const formatted = applyStyleFormat(BasicType.Date, style, d);
            if (formatted !== null) {
               return formatted;
            }
         }
      }
      return d.toLocaleString(config.locales, clone(config.date));
   })

   .set(LocalizeType.Currency, (v: number, style) => {
      assertType(LocalizeType.Currency, v);
      return v.toLocaleString(config.locales, {
         ...config.number,
         style: NumberStyle.Currency,
         currency: style
      });
   })

   .set(LocalizeType.Percent, (v: number) => {
      assertType(LocalizeType.Percent, v);
      return v.toLocaleString(config.locales, {
         ...config.number,
         style: NumberStyle.Percent
      });
   });
