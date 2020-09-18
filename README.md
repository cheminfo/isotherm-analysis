# isotherm-analysis

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![npm download][download-image]][download-url]

Parse and analyze isotherms. For examples of the implemented source files, see examples folder.

## Installation

`$ npm i isotherm-analysis`

## Usage

```js
import IsothermAnalysis from 'isotherm-analysis';

let isotherm = IsothermAnalysis.fromIGA(file);
```

## [API Documentation](https://cheminfo.github.io/isotherm-analysis/)

## Development guidelines

- there are two data types `Adsorption Isotherm` and `Desorption Isotherm`. Ideally, this is directly provided in the file and we parse it from there. Otherwise, if the pressure is descending, it is desorption.
- the `jcamp` has the following fields:

| field | meaning                                                       | typical unit |
| ----- | ------------------------------------------------------------- | ------------ |
| x     | relative pressure (pressure relative to staturation pressure) | unitless     |
| y     | gravimetric excess uptake                                     | mmol/g       |
| p     | absolute pressure                                             | kPa          |

If available, we try to use the following fields for metadata:

- `sampleWeight`: For example, 1.
- `sampleWeightUnit`: For example, g.
- `adsorptive`: For example, N2.

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/isotherm-analysis.svg
[npm-url]: https://www.npmjs.com/package/isotherm-analysis
[ci-image]: https://github.com/cheminfo/isotherm-analysis/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/isotherm-analysis/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/isotherm-analysis.svg
[download-url]: https://www.npmjs.com/package/isotherm-analysis
