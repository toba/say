[![npm package](https://img.shields.io/npm/v/@toba/say.svg)](https://www.npmjs.org/package/@toba/say)
[![Build Status](https://travis-ci.org/toba/say.svg?branch=master)](https://travis-ci.org/toba/say)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Dependencies](https://img.shields.io/david/toba/say.svg)](https://david-dm.org/toba/say)
[![DevDependencies](https://img.shields.io/david/dev/toba/say.svg)](https://david-dm.org/toba/say#info=devDependencies&view=list)
[![Test Coverage](https://codecov.io/gh/toba/say/branch/master/graph/badge.svg)](https://codecov.io/gh/toba/say)

<img src='https://toba.github.io/about/images/logo-colored.svg' width="100" align="right"/>

# Toba Say

http://targetveb.com/i18n-components-stenciljs.html
https://dockyard.com/blog/2019/04/16/lazy-loading-custom-assets-with-stenciljs-part-1

A translation and localization library designed to optimize developer and translator ergonomics.

## Developers

Leverage the [ECMA-402 Internationalization API](https://www.ecma-international.org/ecma-402/5.0/) built into all modern [browsers](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) so verbose and complex logic, like plural rules,

Translations are defined in TypeScript files (`.ts`) to enable autocomplete and validation while editing.

```ts
export default {
   [Phrase.AccountBalance]: `Hello {name}, you have {balance, number, currency} in your bank account.`,
   [Label.Save]: 'Save'
} as { [key: string]: string };
```

### Performance

Instead of parsing to an Abstract Syntax Tree, messages are parsed and cached directly as format functions.

### Verification

Report tool flags translation literals that fail to parse and indicates how many translation phrases exist in the default language that aren't expressed in the other translation files.

#### Running a report

```bash
$ npx say-report ./locales
```

#### Unit testing

The output of the standard report can be made a unit test with an `expect`

```ts
import { reporter } from '@toba/say';

test('translations are valid', () => {
   expect(reporter('path').toBe('good');
});

```

## Translators

Uses the International Components for Unicode [(ICU) Message Syntax](http://userguide.icu-project.org/formatparse/messages)

This is a versatile syntax supported by the most popular translation services.

-  [Crowdin](https://blog.crowdin.com/2016/11/09/icu-syntax-in-crowdin/)
-  [PhraseApp](https://help.phraseapp.com/translate-website-and-app-content/use-icu-message-format/icu-message-format)
-  [Locize](https://medium.com/@jamuhl/we-now-fully-support-icu-format-at-https-locize-com-d2a6775ed06f)

It is the format utilized by the ubiquitous [FormatJS library](https://formatjs.io/guides/message-syntax/)

### Import and Export

The development format is standard ICU Message Syntax. To

## License

Copyright &copy; 2019 Jason Abbott

This software is licensed under the MIT license. See the [LICENSE](./LICENSE) file
accompanying this software for terms of use.
