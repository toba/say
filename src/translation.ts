import { is, merge } from '@toba/tools';
import { Locale } from './constants';
import {
   config,
   setTranslations,
   addTranslations,
   Translations
} from './config';

/**
 * Method that responds to a locale change.
 */
type LocaleHandler = (locale: Locale) => void;

/**
 * Global singleton indicating which translations have been loaded.
 */
const loaded: Set<Locale> = new Set();

/**
 * Methods listening for a locale change.
 */
const listeners: Set<LocaleHandler> = new Set();

/**
 * Fetch `json` file as `Translations`.
 * @param path URL path to server file with "?" where locale code should be inserted
 * @param locale Current locale
 */
export async function loadSource(
   path: string,
   locale: Locale
): Promise<Translations> {
   const res = await fetch(`${path.replace('?', locale)}.json`);
   return res.ok ? res.json() : undefined;
}

/**
 * Change active locale and load its translations from each source path.
 *
 * Compare
 * @see http://kazupon.github.io/vue-i18n/guide/lazy-loading.html
 */
export async function setLocale(
   locale: Locale,
   fallback: Locale = Locale.English
): Promise<boolean> {
   let translations: Translations | undefined = undefined;
   const sourcePaths: string[] = [];

   config.sources.forEach((locales, path) => {
      if (!locales.has(locale)) {
         sourcePaths.push(path);
      }
   });

   const additions: Translations[] = await Promise.all(
      sourcePaths.map(async p => {
         const tx = await loadSource(p, locale);
         if (tx === undefined) {
            throw Error(`Unable to load translations from ${p}`);
         }
         config.sources.get(p)!.add(locale);
         return tx;
      })
   );

   if (additions.length > 0) {
      translations = merge({}, ...additions);
   }

   setTranslations(locale, translations);

   // notify each listener that locale has changed
   listeners.forEach(fn => {
      fn(locale);
   });
   return true;
}

/**
 * Add translations at given URL path (appended to `config.basePath`) and
 * current locale to existing in-memory configuration.
 */
export async function addSource(path: string) {
   if (!path.includes('?')) {
      throw Error(
         `Invalid source path: ${path}. It must include at least one "?" to be substituted with the locale code.`
      );
   }

   const fullPath = config.basePath + path.replace(/\.json$/, '');

   /** Set of already added locale translations for path */
   const added = config.sources.has(fullPath)
      ? config.sources.get(fullPath)!
      : new Set<Locale>();

   if (!added.has(config.locale)) {
      const tx = await loadSource(fullPath, config.locale);
      addTranslations(config.locale, tx);
      added.add(config.locale);
   }
   config.sources.set(fullPath, added);
}

/**
 * Call method when locale changes.
 */
export function onLocaleChange(fn: LocaleHandler) {
   listeners.add(fn);
}

/**
 * Retrieve translation literal for given key and currently configured locale.
 */
export function getTranslation(key: string): string | undefined {
   // TODO: execute locale fallback logic
   if (config.translations.size == 0) {
      throw Error('No translations are loaded');
   }
   const tx = config.translations.get(config.locale);
   return is.value<Translations>(tx) ? tx[key] : undefined;
}

export function reset() {
   loaded.clear();
   listeners.clear();
}
