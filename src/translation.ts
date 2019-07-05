import { is } from '@toba/tools';
import { Locale } from './constants';
import { config, setTranslations, Translations } from './config';

/**
 * Method that responds to a locale change.
 */
type TranslationChange = (locale: Locale) => void;

/**
 * Global singleton indicating which translations have been loaded.
 */
const loaded: Set<Locale> = new Set();

/**
 * Methods listening for a translation change.
 */
const listeners: Set<TranslationChange> = new Set();

// function setI18nLanguage (lang) {
//    i18n.locale = lang
//    axios.defaults.headers.common['Accept-Language'] = lang
//    document.querySelector('html').setAttribute('lang', lang)
//    return lang
//  }

/**
 * Change active locale and load its translations.
 *
 * Compare
 * @see http://kazupon.github.io/vue-i18n/guide/lazy-loading.html
 */
export async function setLocale(
   locale: Locale,
   fallback: Locale = Locale.English
): Promise<boolean> {
   let translations: Translations | undefined;

   if (!loaded.has(locale)) {
      const tx = await import(`${config.path}/${locale}`);
      translations = tx.default;
      loaded.add(locale);
      config.ready = true;
   }
   setTranslations(locale, translations);

   // notify each listener that locale has changed
   listeners.forEach(fn => {
      fn(locale);
   });
   return true;
}

/**
 * Initialize translations.
 */
export async function initialize(): Promise<boolean> {
   if (!config.ready) {
      return setLocale(config.locale, config.fallbackLocale);
   }
   return true;
}

/**
 * Call method when locale changes.
 */
export function onLocaleChange(fn: TranslationChange) {
   listeners.add(fn);
}

/**
 * Retrieve translation literal for given key and currently configured locale.
 */
export function getTranslation(key: string): string | undefined {
   // TODO: execute locale fallback logic
   if (!config.ready) {
      throw Error('No translations are loaded');
   }
   const tx = config.translations.get(config.locale);
   return is.value<Translations>(tx) ? tx[key] : undefined;
}
