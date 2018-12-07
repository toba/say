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
 * @see https://electronjs.org/docs/api/locales
 */
export enum LanguageTag {
   Czech = 'cs',
   Danish = 'da',
   English = 'en',
   EnglishInUK = 'en-GB',
   EnglishInUS = 'en-US',
   German = 'de',
   GermanInAustria = 'de-AT',
   GermanInGermany = 'de-DE',
   GermanInSwitzerland = 'de-CH',
   Greek = 'el',
   Spanish = 'es',
   Japanese = 'jp-JP',
   Welsh = 'cy'

   // el	Greek
   // en	English
   // en-AU	English (Australia)
   // en-CA	English (Canada)
   // en-GB	English (UK)
   // en-NZ	English (New Zealand)
   // en-US	English (US)
   // en-ZA	English (South Africa)
   // es	Spanish
   // es-419	Spanish (Latin America)
   // et	Estonian
   // eu	Basque
   // fa	Persian
   // fi	Finnish
   // fil	Filipino
   // fr	French
   // fr-CA	French (Canada)
   // fr-CH	French (Switzerland)
   // fr-FR	French (France)
   // ga	Irish
   // he	Hebrew
   // hi	Hindi
   // hr	Croatian
   // hu	Hungarian
   // hy	Armenian
   // id	Indonesian
   // is	Icelandic
   // it	Italian
   // it-CH	Italian (Switzerland)
   // it-IT	Italian (Italy)
   // ja	Japanese
   // nb	Norwegian (Bokmal)
   // nl	Dutch
   // nn	Norwegian (Nynorsk)
   // no	Norwegian
   // pl	Polish
   // pt	Portuguese
   // pt-BR	Portuguese (Brazil)
   // pt-PT	Portuguese (Portugal)
   // ro	Romanian
   // ru	Russian
   // sk	Slovak
   // sl	Slovenian
   // sv	Swedish
   // th	Thai
   // tr	Turkish
   // zh	Chinese
   // zh-CN	Chinese (Simplified)
   // zh-TW	Chinese (Traditional)
}
