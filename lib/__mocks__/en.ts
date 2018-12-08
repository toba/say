import { Phrase } from './i18n';

export default {
   [Phrase.AccountBalance]: `Hello {name}, you have {now, time, long} in your bank account.`
} as { [key: string]: string };
