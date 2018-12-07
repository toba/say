export enum CurrencyDisplay {
   /** Use a localized currency symbol such as € */
   Symbol,
   /** Use the ISO currency code */
   Code,
   /** Use a localized currency name such as "dollar" */
   Name
}

/**
 * The locale matching algorithm to use. The default is "best fit".
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl#Locale_negotiation
 */
export enum LocaleMatcher {
   /**
    * Lookup is used to select the single language tag that best matches
    * the language priority list for a given request.  When performing
    * lookup, each language range in the language priority list is
    * considered in turn, according to priority.
    * @see https://tools.ietf.org/html/rfc4647#section-3.4
    */
   Lookup = 'lookup',
   /**
    * Lets the runtime provide a locale that's at least, but possibly more,
    * suited for the request than the result of the Lookup algorithm.
    */
   BestFit = 'best fit'
}
