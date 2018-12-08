import { LanguageTag, PluralType } from './constants';

/**
 * For a given number of items, return the pluralization
 */
type ThresholdSelector = (n: number) => number;

interface PluralRule {
   numbers: number[];
   plurals: ThresholdSelector;
}



const percent: MakeFormatter<number, number> = (places: number) => (
   n: number
) => n.toLocaleString('en', { maximumFractionDigits: places });

interface Placeholder<T> {
   key: string;
   fn: Formatter<T>;
}

type Token = (key: string, type: number, style?: string) => string;

const test = 'text {key:d(2)}';
const t2: Placeholder<number> = {
   key: 'name',
   fn: percent(2)
};

//interface PluralMap {

// formatjs format
// https://formatjs.io/guides/message-syntax/
//
// You have {itemCount, plural,
//    =0 {no items}
//    one {# item}
//    other {# items}
// }.
//
// Your total is {total, number, usd}
