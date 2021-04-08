import {
  Analysis,
  AnalysesManager,
  fromJcamp,
  toJcamp,
  toJcamps,
  JSGraph,
} from 'common-spectrum';

const { getJSGraph, getNormalizationAnnotations } = JSGraph;
export {
  Analysis,
  AnalysesManager,
  fromJcamp,
  toJcamp,
  toJcamps,
  getJSGraph,
  getNormalizationAnnotations,
};

export { fromIGA } from './from/fromIGA';
export { fromMicrometricsTXT } from './from/fromMicrometricsTXT';
export { fromMicrometricsCSV } from './from/fromMicrometricsCSV';
export { fromBelsorp } from './from/fromBelsorp';
