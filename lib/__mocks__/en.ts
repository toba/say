export const Phrase = {
   /** A bank customer's balance */
   AccountBalance: 'accountBalance'
};

export const Label = {
   Save: 'label.save'
};

export default {
   [Phrase.AccountBalance]: `Hello {name}, you have {balance, number, currency} in your bank account.`,
   [Label.Save]: 'Save'
} as { [key: string]: string };
