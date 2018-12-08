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
 *
 * Subset supported in Electron:
 * @see https://electronjs.org/docs/api/locales
 * Subset supported in VSCode:
 * @see https://github.com/Microsoft/Localization/wiki/Visual-Studio-Code-Community-Localization-Project#9-core-languages
 */
export enum Locale {
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
