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

const l = LanguageTag;

/**
 * @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html
 */
export enum PluralForm {
   One = 1,
   Two = 2,
   Asia = 3,
   Four = 4,
   Six = 6,
   Wales = 8,
   France = 9,
   Ireland = 10,
   Iceland = 12,
   Romania = 20,
   TwentyOne = 21,
   Hebrew = 22
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
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/PluralRules#PluralRules_instances
 * @see https://tc39.github.io/ecma402/#pluralrules-objects
 */
export enum PluralType {
   Zero = 'zero',
   One = 'one',
   Two = 'two',
   Few = 'few',
   Many = 'many',
   Other = 'other'
}

interface PluralConfig {
   tags: LanguageTag[];
   nr: number[];
}

/**
 * @see http://docs.translatehouse.org/projects/localization-guide/en/latest/l10n/pluralforms.html?id=l10n/pluralforms
 */
export const PluralGroups: Map<PluralForm, PluralConfig> = new Map([
   [
      PluralForm.One,
      {
         tags: [l.Filipino, l.Portuguese, l.PortugueseInBrazil, l.Turkish],
         nr: [0, 2]
      }
   ],
   [
      PluralForm.Two,
      {
         tags: [
            l.Danish,
            l.German,
            l.Greek,
            l.English,
            l.Spanish,
            l.Estonian,
            l.Basque,
            l.Finnish,
            l.Hindi,
            l.Hungarian,
            l.Armenian,
            l.Italian,
            l.Norwegian,
            l.Dutch,
            l.NorwegianInNynorsk,
            l.PortugueseInPortugal,
            l.Swedish
         ],
         nr: [1, 2]
      }
   ],
   [
      PluralForm.Asia,
      {
         tags: [l.Persian, l.Indonesian, l.Japanese, l.Thai, l.Chinese],
         nr: [1]
      }
   ],
   [
      PluralForm.Four,
      {
         tags: [l.Croation, l.Russian],
         nr: [1, 2, 5]
      }
   ],
   [PluralForm.Six, { tags: [l.Czech, l.Slovak], nr: [1, 2, 5] }],
   [PluralForm.Wales, { tags: [l.Welsh], nr: [1, 2, 3, 8] }],
   [PluralForm.France, { tags: [l.French], nr: [1, 2] }],
   [PluralForm.Ireland, { tags: [l.Irish], nr: [1, 2, 3, 7, 11] }],
   [PluralForm.Iceland, { tags: [l.Icelandic], nr: [1, 2] }],
   [PluralForm.Romania, { tags: [l.Romanian], nr: [1, 2, 20] }],
   [PluralForm.TwentyOne, { tags: [l.Slovenian], nr: [5, 1, 2, 3] }],
   [PluralForm.Hebrew, { tags: [l.Hebrew], nr: [1, 2, 20, 21] }]
]);
