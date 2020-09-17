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
- ideally convent pressure to kPa and excess adsorption to mmol/g
- there are two data types `Adsorption Isotherm` and `Desorption Isotherm`

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/isotherm-analysis.svg
[npm-url]: https://www.npmjs.com/package/isotherm-analysis
[ci-image]: https://github.com/cheminfo/isotherm-analysis/workflows/Node.js%20CI/badge.svg?branch=master
[ci-url]: https://github.com/cheminfo/isotherm-analysis/actions?query=workflow%3A%22Node.js+CI%22
[download-image]: https://img.shields.io/npm/dm/isotherm-analysis.svg
[download-url]: https://www.npmjs.com/package/isotherm-analysis
