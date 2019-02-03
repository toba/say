import { Locale } from './constants';
import { config, setTranslations, Translations } from './config';

type TranslationChange = (locale: Locale) => void;

const loaded: Set<Locale> = new Set([Locale.English]);

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
   _fallback: Locale = Locale.English
) {
   let translations: Translations | undefined;

   if (true || !loaded.has(locale)) {
      const tx = await import(/* webpackChunkName: "lang-[request]" */ `${
         config.path
      }/${locale}`);
      translations = tx.default;
   }
   setTranslations(locale, translations);

   listeners.forEach(fn => {
      fn(locale);
   });
   return true;
}

export function onLocaleChange(fn: TranslationChange) {
   listeners.add(fn);
}

export function getTranslation(key: string): string {
   const tx = config.translations.get(config.locale)!;
   return tx[key];
}
