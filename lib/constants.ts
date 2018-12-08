/**
 * @see https://www.iban.com/currency-codes
 */
export enum CurrencyCode {
   USDollar = 'USD',
   /** Spain */
   Euro = 'EUR',
   AustralianDollar = 'AUD',
   MexicanPeso = 'MXN',
   NewZealandDollar = 'NZD',
   /** Russia */
   Ruble = 'RUB',
   /** South Africa */
   Rand = 'ZAR',
   /** Switzerland, Liechtenstein */
   SwissFranc = 'CHF',
   /** Thailand */
   Baht = 'THB',
   /** Japan */
   Yen = 'JPY',
   /** Malaysia */
   Ringgit = 'MYR',
   /** Qatar */
   Rial = 'QAR',
   /** Pakistan */
   Rupee = 'PKR',
   /** Israel */
   Sheqel = 'ILS',
   /** Iceland */
   Krona = 'ISK'
}

/**
 * BCP 47 language tags.
 * @see https://tools.ietf.org/html/rfc5646
 * Subset supported in Electron
 * @see https://electronjs.org/docs/api/locales
 */
export enum LanguageTag {
   Armenian = 'hy',
   Basque = 'eu',
   Chinese = 'zh',
   ChineseSimplified = 'zh-CN',
   ChineseTraditional = 'zh-TW',
   Croation = 'hr',
   Czech = 'cs',
   Danish = 'da',
   Dutch = 'nl',
   English = 'en',
   EnglishInCanada = 'en-CA',
   EnglishInNewZealand = 'en-NZ',
   EnglishInSouthAfrica = 'en-ZA',
   EnglishInUK = 'en-GB',
   EnglishInUS = 'en-US',
   Estonian = 'et',
   Filipino = 'fil',
   Finnish = 'fi',
   French = 'fr',
   FrenchInCanada = 'fr-CA',
   FrenchInFrance = 'fr-FR',
   FrenchInSwitzerland = 'fr-CH',
   German = 'de',
   GermanInAustria = 'de-AT',
   GermanInGermany = 'de-DE',
   GermanInSwitzerland = 'de-CH',
   Greek = 'el',
   Hebrew = 'he',
   Hindi = 'hi',
   Hungarian = 'hu',
   Icelandic = 'is',
   Indonesian = 'id',
   Irish = 'ga',
   Italian = 'it',
   ItalianInItaly = 'it-IT',
   ItalianInSwitzerland = 'it-CH',
   Norwegian = 'nb',
   NorwegianInNynorsk = 'nn',
   Japanese = 'ja',
   Persian = 'fa',
   Polish = 'pl',
   Portuguese = 'pt',
   PortugueseInBrazil = 'pt-BR',
   PortugueseInPortugal = 'pt-PT',
   Romanian = 'ro',
   Russian = 'ru',
   Slovak = 'sk',
   Slovenian = 'sl',
   Swedish = 'sv',
   Spanish = 'es',
   SpanishInLatinAmerica = 'es-419',
   Thai = 'th',
   Turkish = 'tr',
   Welsh = 'cy'
}

/**
 * Types of plurals supported in different languages.
 *
 * `Intl.PluralRules([lang]).select([count])` returns the type for a given
 * language and count.
 *
 * English, for example has only two types, `one` and `other`. One item is
 * singular but zero or more than one are plural.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules/select
 * @see https://tc39.github.io/ecma402/#pluralrules-objects
 */
export enum PluralType {
   /**
    * Specific grammar for zero items (as in Arabic and Latvian).
    */
   Zero = 'zero',

   /**
    * Specific grammar for one item. Many languages, but not all, use this type.
    * (Many popular Asian languages, such as Chinese and Japanese, do not.)
    */
   One = 'one',

   /**
    * Specific grammar for two items (as in Arabic and Welsh).
    */
   Two = 'two',

   /**
    * Specific grammar for a small number of items. For some languages this is
    * used for 2-4 items, for some 3-10 items, and other languages have even
    * more complex rules.
    */
   Few = 'few',

   /**
    * Specific grammar for a larger number of items (as in Arabic, Polish, and
    * Russian).
    */
   Many = 'many',

   /**
    * Used if the value doesn't match one of the other plural categories. This
    * is used for "plural" for languages (such as English) that have a simple
    * "singular" versus "plural" dichotomy.
    */
   Other = 'other'
}
