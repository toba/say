import { clone, mergeAll } from '@toba/tools';
import { Locale } from './constants';

/**
 * Basic types supported by standard internationalization library.
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl
 */
export enum BasicType {
   Date = 'date',
   Number = 'number',
   Text = 'string'
}

/**
 * Types supported by internationalization library.
 */
export type AllowedType = string | number | Date;

export type StringFormat = any;

export interface Configuration {
   /**
    * BCP 47 language tag or tags.
    */
   locales: Locale | Locale[];
   /**
    * An object that contains translations as key-value-pairs
    */
   translations?: { [key: string]: string };
}

const defaultConfig: Configuration = Object.freeze({
   locales: Locale.English,
   translations: {}
});

export let config = clone(defaultConfig);

/**
 * Update configuration.
 */
export function configure(changes: Configuration) {
   config = mergeAll(config, changes);
   return config;
}
