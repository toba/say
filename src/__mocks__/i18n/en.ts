import { Translations } from '../../';
import { Phrase, Label } from './';

export default {
   [Phrase.AccountBalance]: `Hello {name}, you have {balance, number, currency} in your bank account.`,
   [Label.Save]: 'Save'
} as Translations;
