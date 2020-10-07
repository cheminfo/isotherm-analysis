/**
 * isotherm-analysis - Parse and analyze isotherms
 * @version v0.1.1
 * @link https://github.com/cheminfo/isotherm-analysis#readme
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.IsothermAnalysis = {}));
}(this, (function (exports) { 'use strict';

  class AnalysesManager {
    constructor() {
      this.analyses = [];
    }

    addAnalysis(analysis) {
      let index = this.getAnalysisIndex(analysis.id);

      if (index === undefined) {
        this.analyses.push(analysis);
      } else {
        this.analyses[index] = analysis;
      }
    }

    getAnalyses(options = {}) {
      const {
        ids
      } = options;
      let analyses = [];

      for (const analysis of this.analyses) {
        if (!ids || ids.includes(analysis.id)) {
          analyses.push(analysis);
        }
      }

      return analyses;
    }
    /**
     * Remove the analysis from the AnalysesManager for the specified id
     * @param {string} id
     */


    removeAnalysis(id) {
      let index = this.getAnalysisIndex(id);
      if (index === undefined) return undefined;
      return this.analyses.splice(index, 1);
    }
    /**
     * Returns the index of the analysis in the analyses array
     * @param {string} id
     * @returns {number}
     */


    getAnalysisIndex(id) {
      if (!id) return undefined;

      for (let i = 0; i < this.analyses.length; i++) {
        let analysis = this.analyses[i];
        if (analysis.id === id) return i;
      }

      return undefined;
    }
    /**
     * Checks if the ID of an analysis exists in the AnalysesManager
     * @param {string} id
     */


    includes(id) {
      return !isNaN(this.getAnalysisIndex(id));
    }

  }

  const toString = Object.prototype.toString;
  function isAnyArray(object) {
    return toString.call(object).endsWith('Array]');
  }

  const toString$1 = Object.prototype.toString;

  function isAnyArray$1(object) {
    return toString$1.call(object).endsWith('Array]');
  }

  var src = isAnyArray$1;

  /**
   * Computes the maximum of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function max(input) {
    if (!src(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var maxValue = input[0];

    for (var i = 1; i < input.length; i++) {
      if (input[i] > maxValue) maxValue = input[i];
    }

    return maxValue;
  }

  const toString$2 = Object.prototype.toString;

  function isAnyArray$2(object) {
    return toString$2.call(object).endsWith('Array]');
  }

  var src$1 = isAnyArray$2;

  /**
   * Computes the mean of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function sum(input) {
    if (!src$1(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += input[i];
    }

    return sumValue;
  }

  /**
   * Computes the norm of the given values
   * @param {Array<number>} input
   * @param {object} [options={}]
   * @param {string} [options.algorithm='absolute'] absolute, sum or max
   * @param {number} [options.maxValue=1] new max value for algo max
   * @param {number} [options.sumValue=1] new max value for algo absolute and sum
   * @param {Array} [options.output=[]] specify the output array, can be the input array for in place modification
   * @return {number}
   */

  function norm(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var _options$algorithm = options.algorithm,
        algorithm = _options$algorithm === void 0 ? 'absolute' : _options$algorithm,
        _options$sumValue = options.sumValue,
        sumValue = _options$sumValue === void 0 ? 1 : _options$sumValue,
        _options$maxValue = options.maxValue,
        maxValue = _options$maxValue === void 0 ? 1 : _options$maxValue;

    if (!isAnyArray(input)) {
      throw new Error('input must be an array');
    }

    var output;

    if (options.output !== undefined) {
      if (!isAnyArray(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    if (input.length === 0) {
      throw new Error('input must not be empty');
    }

    switch (algorithm.toLowerCase()) {
      case 'absolute':
        {
          var absoluteSumValue = absoluteSum(input) / sumValue;
          if (absoluteSumValue === 0) return input.slice(0);

          for (var i = 0; i < input.length; i++) {
            output[i] = input[i] / absoluteSumValue;
          }

          return output;
        }

      case 'max':
        {
          var currentMaxValue = max(input);
          if (currentMaxValue === 0) return input.slice(0);
          var factor = maxValue / currentMaxValue;

          for (var _i = 0; _i < input.length; _i++) {
            output[_i] = input[_i] * factor;
          }

          return output;
        }

      case 'sum':
        {
          var sumFactor = sum(input) / sumValue;
          if (sumFactor === 0) return input.slice(0);

          for (var _i2 = 0; _i2 < input.length; _i2++) {
            output[_i2] = input[_i2] / sumFactor;
          }

          return output;
        }

      default:
        throw new Error("norm: unknown algorithm: ".concat(algorithm));
    }
  }

  function absoluteSum(input) {
    var sumValue = 0;

    for (var i = 0; i < input.length; i++) {
      sumValue += Math.abs(input[i]);
    }

    return sumValue;
  }

  const toString$3 = Object.prototype.toString;

  function isAnyArray$3(object) {
    return toString$3.call(object).endsWith('Array]');
  }

  var src$2 = isAnyArray$3;

  const toString$4 = Object.prototype.toString;

  function isAnyArray$4(object) {
    return toString$4.call(object).endsWith('Array]');
  }

  var src$3 = isAnyArray$4;

  /**
   * Computes the minimum of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function min(input) {
    if (!src$3(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var minValue = input[0];

    for (var i = 1; i < input.length; i++) {
      if (input[i] < minValue) minValue = input[i];
    }

    return minValue;
  }

  /**
   *
   * @param {Array} input
   * @param {object} [options={}]
   * @param {Array} [options.output=[]] specify the output array, can be the input array for in place modification
   */

  function rescale(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!src$2(input)) {
      throw new TypeError('input must be an array');
    } else if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    var output;

    if (options.output !== undefined) {
      if (!src$2(options.output)) {
        throw new TypeError('output option must be an array if specified');
      }

      output = options.output;
    } else {
      output = new Array(input.length);
    }

    var currentMin = min(input);
    var currentMax = max(input);

    if (currentMin === currentMax) {
      throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
    }

    var _options$min = options.min,
        minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
        _options$max = options.max,
        maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

    if (minValue >= maxValue) {
      throw new RangeError('min option must be smaller than max option');
    }

    var factor = (maxValue - minValue) / (currentMax - currentMin);

    for (var i = 0; i < input.length; i++) {
      output[i] = (input[i] - currentMin) * factor + minValue;
    }

    return output;
  }

  const toString$5 = Object.prototype.toString;

  function isAnyArray$5(object) {
    return toString$5.call(object).endsWith('Array]');
  }

  var src$4 = isAnyArray$5;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }
  /**
   * Fill an array with sequential numbers
   * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
   * @param {object} [options={}]
   * @param {number} [options.from=0] - first value in the array
   * @param {number} [options.to=10] - last value in the array
   * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
   * @param {number} [options.step] - if not provided calculated from size
   * @return {Array<number>}
   */


  function sequentialFill() {
    var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (_typeof(input) === 'object' && !src$4(input)) {
      options = input;
      input = [];
    }

    if (!src$4(input)) {
      throw new TypeError('input must be an array');
    }

    var _options = options,
        _options$from = _options.from,
        from = _options$from === void 0 ? 0 : _options$from,
        _options$to = _options.to,
        to = _options$to === void 0 ? 10 : _options$to,
        _options$size = _options.size,
        size = _options$size === void 0 ? input.length : _options$size,
        step = _options.step;

    if (size && step) {
      throw new Error('step is defined by the array size');
    }

    if (!size) {
      if (step) {
        size = Math.floor((to - from) / step) + 1;
      } else {
        size = to - from + 1;
      }
    }

    if (!step && size) {
      step = (to - from) / (size - 1);
    }

    if (Array.isArray(input)) {
      input.length = 0; // only works with normal array

      for (var i = 0; i < size; i++) {
        input.push(from);
        from += step;
      }
    } else {
      if (input.length !== size) {
        throw new Error('sequentialFill typed array must have the correct length');
      }

      for (var _i = 0; _i < size; _i++) {
        input[_i] = from;
        from += step;
      }
    }

    return input;
  }

  /**
   * Normalize an array of zones:
   * - ensure than from < to
   * - merge overlapping zones
   *
   * The method will always check if from if lower than to and will swap if required.
   * @param {Array} [zones=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
   */
  function normalize(zones = [], options = {}) {
    if (zones.length === 0) return [];
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;
    if (from > to) [from, to] = [to, from];
    zones = JSON.parse(JSON.stringify(zones)).map(zone => zone.from > zone.to ? {
      from: zone.to,
      to: zone.from
    } : zone);
    zones = zones.sort((a, b) => {
      if (a.from !== b.from) return a.from - b.from;
      return a.to - b.to;
    });
    zones.forEach(zone => {
      if (from > zone.from) zone.from = from;
      if (to < zone.to) zone.to = to;
    });
    zones = zones.filter(zone => zone.from <= zone.to);
    if (zones.length === 0) return [];
    let currentZone = zones[0];
    let result = [currentZone];

    for (let i = 1; i < zones.length; i++) {
      let zone = zones[i];

      if (zone.from <= currentZone.to) {
        currentZone.to = zone.to;
      } else {
        currentZone = zone;
        result.push(currentZone);
      }
    }

    return result;
  }

  /**
   * Convert an array of exclusions and keep only from / to
   *
   * The method will always check if from if lower than to and will swap if required.
   * @param {Array} [exclusions=[]]
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of zones (after inversion)
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of zones (after inversion)
   */

  function invert(exclusions = [], options = {}) {
    let {
      from = Number.NEGATIVE_INFINITY,
      to = Number.POSITIVE_INFINITY
    } = options;
    if (from > to) [from, to] = [to, from];
    exclusions = normalize(exclusions, {
      from,
      to
    });
    if (exclusions.length === 0) return [{
      from,
      to
    }];
    let zones = [];

    for (let i = 0; i < exclusions.length; i++) {
      let exclusion = exclusions[i];
      let nextExclusion = exclusions[i + 1];

      if (i === 0) {
        if (exclusion.from > from) {
          zones.push({
            from,
            to: exclusion.from
          });
        }
      }

      if (i === exclusions.length - 1) {
        if (exclusion.to < to) {
          zones.push({
            from: exclusion.to,
            to
          });
        }
      } else {
        zones.push({
          from: exclusion.to,
          to: nextExclusion.from
        });
      }
    }

    return zones;
  }

  /**
   * Add the number of points per zone to reach a specified total
   * @param {Array} [zones=[]]
   * @param {number} [numberOfPoints] Total number of points to distribute between zones
   * @param {object} [options={}]
   * @param {number} [options.from=Number.NEGATIVE_INFINITY] Specify min value of a zone
   * @param {number} [options.to=Number.POSITIVE_INFINITY] Specify max value of a zone
   */

  function zonesWithPoints(zones, numberOfPoints, options = {}) {
    if (zones.length === 0) return zones;
    zones = normalize(zones, options);
    const totalSize = zones.reduce((previous, current) => {
      return previous + (current.to - current.from);
    }, 0);
    let unitsPerPoint = totalSize / numberOfPoints;
    let currentTotal = 0;

    for (let i = 0; i < zones.length - 1; i++) {
      let zone = zones[i];
      zone.numberOfPoints = Math.min(Math.round((zone.to - zone.from) / unitsPerPoint), numberOfPoints - currentTotal);
      currentTotal += zone.numberOfPoints;
    }

    zones[zones.length - 1].numberOfPoints = numberOfPoints - currentTotal;
    return zones;
  }

  /**
   * Function that calculates the integral of the line between two
   * x-coordinates, given the slope and intercept of the line.
   * @param {number} x0
   * @param {number} x1
   * @param {number} slope
   * @param {number} intercept
   * @return {number} integral value.
   */
  function integral(x0, x1, slope, intercept) {
    return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "smooth"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "smooth"
   */

  function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
    let xLength = x.length;
    let step = (to - from) / (numberOfPoints - 1);
    let halfStep = step / 2;
    let output = new Array(numberOfPoints);
    let initialOriginalStep = x[1] - x[0];
    let lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

    let min = from - halfStep;
    let max = from + halfStep;
    let previousX = Number.MIN_VALUE;
    let previousY = 0;
    let nextX = x[0] - initialOriginalStep;
    let nextY = 0;
    let currentValue = 0;
    let slope = 0;
    let intercept = 0;
    let sumAtMin = 0;
    let sumAtMax = 0;
    let i = 0; // index of input

    let j = 0; // index of output

    function getSlope(x0, y0, x1, y1) {
      return (y1 - y0) / (x1 - x0);
    }

    let add = 0;

    main: while (true) {
      if (previousX <= min && min <= nextX) {
        add = integral(0, min - previousX, slope, previousY);
        sumAtMin = currentValue + add;
      }

      while (nextX - max >= 0) {
        // no overlap with original point, just consume current value
        add = integral(0, max - previousX, slope, previousY);
        sumAtMax = currentValue + add;
        output[j++] = (sumAtMax - sumAtMin) / step;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        sumAtMin = sumAtMax;
      }

      currentValue += integral(previousX, nextX, slope, intercept);
      previousX = nextX;
      previousY = nextY;

      if (i < xLength) {
        nextX = x[i];
        nextY = y[i];
        i++;
      } else if (i === xLength) {
        nextX += lastOriginalStep;
        nextY = 0;
      }

      slope = getSlope(previousX, previousY, nextX, nextY);
      intercept = -slope * previousX + previousY;
    }

    return output;
  }

  /**
   * function that retrieves the getEquallySpacedData with the variant "slot"
   *
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @param {number} from - Initial point
   * @param {number} to - Final point
   * @param {number} numberOfPoints
   * @return {Array} - Array of y's equally spaced with the variant "slot"
   */
  function equallySpacedSlot(x, y, from, to, numberOfPoints) {
    let xLength = x.length;
    let step = (to - from) / (numberOfPoints - 1);
    let halfStep = step / 2;
    let lastStep = x[x.length - 1] - x[x.length - 2];
    let start = from - halfStep;
    let output = new Array(numberOfPoints); // Init main variables

    let min = start;
    let max = start + step;
    let previousX = -Number.MAX_VALUE;
    let previousY = 0;
    let nextX = x[0];
    let nextY = y[0];
    let frontOutsideSpectra = 0;
    let backOutsideSpectra = true;
    let currentValue = 0; // for slot algorithm

    let currentPoints = 0;
    let i = 1; // index of input

    let j = 0; // index of output

    main: while (true) {
      if (previousX >= nextX) throw new Error('x must be an increasing serie');

      while (previousX - max > 0) {
        // no overlap with original point, just consume current value
        if (backOutsideSpectra) {
          currentPoints++;
          backOutsideSpectra = false;
        }

        output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
        j++;

        if (j === numberOfPoints) {
          break main;
        }

        min = max;
        max += step;
        currentValue = 0;
        currentPoints = 0;
      }

      if (previousX > min) {
        currentValue += previousY;
        currentPoints++;
      }

      if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
        currentPoints--;
      }

      previousX = nextX;
      previousY = nextY;

      if (i < xLength) {
        nextX = x[i];
        nextY = y[i];
        i++;
      } else {
        nextX += lastStep;
        nextY = 0;
        frontOutsideSpectra++;
      }
    }

    return output;
  }

  /**
   * Function that returns a Number array of equally spaced numberOfPoints
   * containing a representation of intensities of the spectra arguments x
   * and y.
   *
   * The options parameter contains an object in the following form:
   * from: starting point
   * to: last point
   * numberOfPoints: number of points between from and to
   * variant: "slot" or "smooth" - smooth is the default option
   *
   * The slot variant consist that each point in the new array is calculated
   * averaging the existing points between the slot that belongs to the current
   * value. The smooth variant is the same but takes the integral of the range
   * of the slot and divide by the step size between two points in the new array.
   *
   * If exclusions zone are present, zones are ignored !
   * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
   * @param {object} [options={}]
   * @param {number} [options.from=x[0]]
   * @param {number} [options.to=x[x.length-1]]
   * @param {string} [options.variant='smooth']
   * @param {number} [options.numberOfPoints=100]
   * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
   * @param {Array} [options.zones=[]] array of from / to that should be kept
   * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
   */

  function equallySpaced(arrayXY = {}, options = {}) {
    let {
      x,
      y
    } = arrayXY;
    let xLength = x.length;
    let reverse = false;

    if (x.length > 1 && x[0] > x[1]) {
      x = x.slice().reverse();
      y = y.slice().reverse();
      reverse = true;
    }

    let {
      from = x[0],
      to = x[xLength - 1],
      variant = 'smooth',
      numberOfPoints = 100,
      exclusions = [],
      zones = []
    } = options;

    if (xLength !== y.length) {
      throw new RangeError("the x and y vector doesn't have the same size.");
    }

    if (typeof from !== 'number' || isNaN(from)) {
      throw new RangeError("'from' option must be a number");
    }

    if (typeof to !== 'number' || isNaN(to)) {
      throw new RangeError("'to' option must be a number");
    }

    if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
      throw new RangeError("'numberOfPoints' option must be a number");
    }

    if (numberOfPoints < 2) {
      throw new RangeError("'numberOfPoints' option must be greater than 1");
    }

    if (zones.length === 0) {
      zones = invert(exclusions, {
        from,
        to
      });
    }

    zones = zonesWithPoints(zones, numberOfPoints, {
      from,
      to
    });
    let xResult = [];
    let yResult = [];

    for (let zone of zones) {
      let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant);
      xResult = xResult.concat(zoneResult.x);
      yResult = yResult.concat(zoneResult.y);
    }

    if (reverse) {
      if (from < to) {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      } else {
        return {
          x: xResult,
          y: yResult
        };
      }
    } else {
      if (from < to) {
        return {
          x: xResult,
          y: yResult
        };
      } else {
        return {
          x: xResult.reverse(),
          y: yResult.reverse()
        };
      }
    }
  }

  function processZone(x, y, from, to, numberOfPoints, variant) {
    if (numberOfPoints < 1) {
      throw new RangeError('the number of points must be at least 1');
    }

    let output = variant === 'slot' ? equallySpacedSlot(x, y, from, to, numberOfPoints) : equallySpacedSmooth(x, y, from, to, numberOfPoints);
    return {
      x: sequentialFill({
        from,
        to,
        size: numberOfPoints
      }),
      y: output
    };
  }

  function getZones(from, to, exclusions = []) {
    if (from > to) {
      [from, to] = [to, from];
    } // in exclusions from and to have to be defined


    exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
    exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

    exclusions.forEach(exclusion => {
      if (exclusion.from > exclusion.to) {
        [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
      }
    });
    exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

    exclusions.forEach(exclusion => {
      if (exclusion.from < from) exclusion.from = from;
      if (exclusion.to > to) exclusion.to = to;
    });

    for (let i = 0; i < exclusions.length - 1; i++) {
      if (exclusions[i].to > exclusions[i + 1].from) {
        exclusions[i].to = exclusions[i + 1].from;
      }
    }

    exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

    if (!exclusions || exclusions.length === 0) {
      return [{
        from,
        to
      }];
    }

    let zones = [];
    let currentFrom = from;

    for (let exclusion of exclusions) {
      if (currentFrom < exclusion.from) {
        zones.push({
          from: currentFrom,
          to: exclusion.from
        });
      }

      currentFrom = exclusion.to;
    }

    if (currentFrom < to) {
      zones.push({
        from: currentFrom,
        to: to
      });
    }

    return zones;
  }

  /**
   * Filter an array x/y based on various criteria
   * x points are expected to be sorted
   *
   * @param {object} points
   * @param {object} [options={}]
   * @param {array} [options.from]
   * @param {array} [options.to]
   * @param {array} [options.exclusions=[]]
   * @return {{x: Array<number>, y: Array<number>}}
   */

  function filterX(points, options = {}) {
    const {
      x,
      y
    } = points;
    const {
      from = x[0],
      to = x[x.length - 1],
      exclusions = []
    } = options;
    let zones = getZones(from, to, exclusions);
    let currentZoneIndex = 0;
    let newX = [];
    let newY = [];
    let position = 0;

    while (position < x.length) {
      if (x[position] <= zones[currentZoneIndex].to && x[position] >= zones[currentZoneIndex].from) {
        newX.push(x[position]);
        newY.push(y[position]);
      } else {
        if (x[position] > zones[currentZoneIndex].to) {
          currentZoneIndex++;
          if (!zones[currentZoneIndex]) break;
        }
      }

      position++;
    }

    return {
      x: newX,
      y: newY
    };
  }

  const indent = ' '.repeat(2);
  const indentData = ' '.repeat(4);
  function inspectMatrix() {
    return inspectMatrixWithOptions(this);
  }
  function inspectMatrixWithOptions(matrix, options = {}) {
    const {
      maxRows = 15,
      maxColumns = 10,
      maxNumSize = 8
    } = options;
    return `${matrix.constructor.name} {
${indent}[
${indentData}${inspectData(matrix, maxRows, maxColumns, maxNumSize)}
${indent}]
${indent}rows: ${matrix.rows}
${indent}columns: ${matrix.columns}
}`;
  }

  function inspectData(matrix, maxRows, maxColumns, maxNumSize) {
    const {
      rows,
      columns
    } = matrix;
    const maxI = Math.min(rows, maxRows);
    const maxJ = Math.min(columns, maxColumns);
    const result = [];

    for (let i = 0; i < maxI; i++) {
      let line = [];

      for (let j = 0; j < maxJ; j++) {
        line.push(formatNumber(matrix.get(i, j), maxNumSize));
      }

      result.push(`${line.join(' ')}`);
    }

    if (maxJ !== columns) {
      result[result.length - 1] += ` ... ${columns - maxColumns} more columns`;
    }

    if (maxI !== rows) {
      result.push(`... ${rows - maxRows} more rows`);
    }

    return result.join(`\n${indentData}`);
  }

  function formatNumber(num, maxNumSize) {
    const numStr = String(num);

    if (numStr.length <= maxNumSize) {
      return numStr.padEnd(maxNumSize, ' ');
    }

    const precise = num.toPrecision(maxNumSize - 2);

    if (precise.length <= maxNumSize) {
      return precise;
    }

    const exponential = num.toExponential(maxNumSize - 2);
    const eIndex = exponential.indexOf('e');
    const e = exponential.slice(eIndex);
    return exponential.slice(0, maxNumSize - e.length) + e;
  }

  function installMathOperations(AbstractMatrix, Matrix) {
    AbstractMatrix.prototype.add = function add(value) {
      if (typeof value === 'number') return this.addS(value);
      return this.addM(value);
    };

    AbstractMatrix.prototype.addS = function addS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.addM = function addM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.add = function add(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.add(value);
    };

    AbstractMatrix.prototype.sub = function sub(value) {
      if (typeof value === 'number') return this.subS(value);
      return this.subM(value);
    };

    AbstractMatrix.prototype.subS = function subS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.subM = function subM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.sub = function sub(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sub(value);
    };

    AbstractMatrix.prototype.subtract = AbstractMatrix.prototype.sub;
    AbstractMatrix.prototype.subtractS = AbstractMatrix.prototype.subS;
    AbstractMatrix.prototype.subtractM = AbstractMatrix.prototype.subM;
    AbstractMatrix.subtract = AbstractMatrix.sub;

    AbstractMatrix.prototype.mul = function mul(value) {
      if (typeof value === 'number') return this.mulS(value);
      return this.mulM(value);
    };

    AbstractMatrix.prototype.mulS = function mulS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.mulM = function mulM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mul = function mul(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.mul(value);
    };

    AbstractMatrix.prototype.multiply = AbstractMatrix.prototype.mul;
    AbstractMatrix.prototype.multiplyS = AbstractMatrix.prototype.mulS;
    AbstractMatrix.prototype.multiplyM = AbstractMatrix.prototype.mulM;
    AbstractMatrix.multiply = AbstractMatrix.mul;

    AbstractMatrix.prototype.div = function div(value) {
      if (typeof value === 'number') return this.divS(value);
      return this.divM(value);
    };

    AbstractMatrix.prototype.divS = function divS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.divM = function divM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.div = function div(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.div(value);
    };

    AbstractMatrix.prototype.divide = AbstractMatrix.prototype.div;
    AbstractMatrix.prototype.divideS = AbstractMatrix.prototype.divS;
    AbstractMatrix.prototype.divideM = AbstractMatrix.prototype.divM;
    AbstractMatrix.divide = AbstractMatrix.div;

    AbstractMatrix.prototype.mod = function mod(value) {
      if (typeof value === 'number') return this.modS(value);
      return this.modM(value);
    };

    AbstractMatrix.prototype.modS = function modS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.modM = function modM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) % matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.mod = function mod(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.mod(value);
    };

    AbstractMatrix.prototype.modulus = AbstractMatrix.prototype.mod;
    AbstractMatrix.prototype.modulusS = AbstractMatrix.prototype.modS;
    AbstractMatrix.prototype.modulusM = AbstractMatrix.prototype.modM;
    AbstractMatrix.modulus = AbstractMatrix.mod;

    AbstractMatrix.prototype.and = function and(value) {
      if (typeof value === 'number') return this.andS(value);
      return this.andM(value);
    };

    AbstractMatrix.prototype.andS = function andS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.andM = function andM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) & matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.and = function and(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.and(value);
    };

    AbstractMatrix.prototype.or = function or(value) {
      if (typeof value === 'number') return this.orS(value);
      return this.orM(value);
    };

    AbstractMatrix.prototype.orS = function orS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.orM = function orM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) | matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.or = function or(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.or(value);
    };

    AbstractMatrix.prototype.xor = function xor(value) {
      if (typeof value === 'number') return this.xorS(value);
      return this.xorM(value);
    };

    AbstractMatrix.prototype.xorS = function xorS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.xorM = function xorM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) ^ matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.xor = function xor(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.xor(value);
    };

    AbstractMatrix.prototype.leftShift = function leftShift(value) {
      if (typeof value === 'number') return this.leftShiftS(value);
      return this.leftShiftM(value);
    };

    AbstractMatrix.prototype.leftShiftS = function leftShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.leftShiftM = function leftShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) << matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.leftShift = function leftShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.leftShift(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShift = function signPropagatingRightShift(value) {
      if (typeof value === 'number') return this.signPropagatingRightShiftS(value);
      return this.signPropagatingRightShiftM(value);
    };

    AbstractMatrix.prototype.signPropagatingRightShiftS = function signPropagatingRightShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.signPropagatingRightShiftM = function signPropagatingRightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.signPropagatingRightShift = function signPropagatingRightShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.signPropagatingRightShift(value);
    };

    AbstractMatrix.prototype.rightShift = function rightShift(value) {
      if (typeof value === 'number') return this.rightShiftS(value);
      return this.rightShiftM(value);
    };

    AbstractMatrix.prototype.rightShiftS = function rightShiftS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> value);
        }
      }

      return this;
    };

    AbstractMatrix.prototype.rightShiftM = function rightShiftM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) >>> matrix.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.rightShift = function rightShift(matrix, value) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.rightShift(value);
    };

    AbstractMatrix.prototype.zeroFillRightShift = AbstractMatrix.prototype.rightShift;
    AbstractMatrix.prototype.zeroFillRightShiftS = AbstractMatrix.prototype.rightShiftS;
    AbstractMatrix.prototype.zeroFillRightShiftM = AbstractMatrix.prototype.rightShiftM;
    AbstractMatrix.zeroFillRightShift = AbstractMatrix.rightShift;

    AbstractMatrix.prototype.not = function not() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, ~this.get(i, j));
        }
      }

      return this;
    };

    AbstractMatrix.not = function not(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.not();
    };

    AbstractMatrix.prototype.abs = function abs() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.abs(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.abs = function abs(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.abs();
    };

    AbstractMatrix.prototype.acos = function acos() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acos = function acos(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.acos();
    };

    AbstractMatrix.prototype.acosh = function acosh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.acosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.acosh = function acosh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.acosh();
    };

    AbstractMatrix.prototype.asin = function asin() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asin = function asin(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.asin();
    };

    AbstractMatrix.prototype.asinh = function asinh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.asinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.asinh = function asinh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.asinh();
    };

    AbstractMatrix.prototype.atan = function atan() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atan = function atan(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.atan();
    };

    AbstractMatrix.prototype.atanh = function atanh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.atanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.atanh = function atanh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.atanh();
    };

    AbstractMatrix.prototype.cbrt = function cbrt() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cbrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cbrt = function cbrt(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cbrt();
    };

    AbstractMatrix.prototype.ceil = function ceil() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.ceil(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.ceil = function ceil(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.ceil();
    };

    AbstractMatrix.prototype.clz32 = function clz32() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.clz32(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.clz32 = function clz32(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.clz32();
    };

    AbstractMatrix.prototype.cos = function cos() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cos(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cos = function cos(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cos();
    };

    AbstractMatrix.prototype.cosh = function cosh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.cosh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.cosh = function cosh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.cosh();
    };

    AbstractMatrix.prototype.exp = function exp() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.exp(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.exp = function exp(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.exp();
    };

    AbstractMatrix.prototype.expm1 = function expm1() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.expm1(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.expm1 = function expm1(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.expm1();
    };

    AbstractMatrix.prototype.floor = function floor() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.floor(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.floor = function floor(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.floor();
    };

    AbstractMatrix.prototype.fround = function fround() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.fround(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.fround = function fround(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.fround();
    };

    AbstractMatrix.prototype.log = function log() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log = function log(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log();
    };

    AbstractMatrix.prototype.log1p = function log1p() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log1p(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log1p = function log1p(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log1p();
    };

    AbstractMatrix.prototype.log10 = function log10() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log10(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log10 = function log10(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log10();
    };

    AbstractMatrix.prototype.log2 = function log2() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.log2(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.log2 = function log2(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.log2();
    };

    AbstractMatrix.prototype.round = function round() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.round(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.round = function round(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.round();
    };

    AbstractMatrix.prototype.sign = function sign() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sign(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sign = function sign(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sign();
    };

    AbstractMatrix.prototype.sin = function sin() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sin(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sin = function sin(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sin();
    };

    AbstractMatrix.prototype.sinh = function sinh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sinh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sinh = function sinh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sinh();
    };

    AbstractMatrix.prototype.sqrt = function sqrt() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.sqrt(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.sqrt = function sqrt(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.sqrt();
    };

    AbstractMatrix.prototype.tan = function tan() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tan(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tan = function tan(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.tan();
    };

    AbstractMatrix.prototype.tanh = function tanh() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.tanh(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.tanh = function tanh(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.tanh();
    };

    AbstractMatrix.prototype.trunc = function trunc() {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.trunc(this.get(i, j)));
        }
      }

      return this;
    };

    AbstractMatrix.trunc = function trunc(matrix) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.trunc();
    };

    AbstractMatrix.pow = function pow(matrix, arg0) {
      const newMatrix = new Matrix(matrix);
      return newMatrix.pow(arg0);
    };

    AbstractMatrix.prototype.pow = function pow(value) {
      if (typeof value === 'number') return this.powS(value);
      return this.powM(value);
    };

    AbstractMatrix.prototype.powS = function powS(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), value));
        }
      }

      return this;
    };

    AbstractMatrix.prototype.powM = function powM(matrix) {
      matrix = Matrix.checkMatrix(matrix);

      if (this.rows !== matrix.rows || this.columns !== matrix.columns) {
        throw new RangeError('Matrices dimensions must be equal');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, Math.pow(this.get(i, j), matrix.get(i, j)));
        }
      }

      return this;
    };
  }

  /**
   * @private
   * Check that a row index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */
  function checkRowIndex(matrix, index, outer) {
    let max = outer ? matrix.rows : matrix.rows - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Row index out of range');
    }
  }
  /**
   * @private
   * Check that a column index is not out of bounds
   * @param {Matrix} matrix
   * @param {number} index
   * @param {boolean} [outer]
   */

  function checkColumnIndex(matrix, index, outer) {
    let max = outer ? matrix.columns : matrix.columns - 1;

    if (index < 0 || index > max) {
      throw new RangeError('Column index out of range');
    }
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkRowVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.columns) {
      throw new RangeError('vector size must be the same as the number of columns');
    }

    return vector;
  }
  /**
   * @private
   * Check that the provided vector is an array with the right length
   * @param {Matrix} matrix
   * @param {Array|Matrix} vector
   * @return {Array}
   * @throws {RangeError}
   */

  function checkColumnVector(matrix, vector) {
    if (vector.to1DArray) {
      vector = vector.to1DArray();
    }

    if (vector.length !== matrix.rows) {
      throw new RangeError('vector size must be the same as the number of rows');
    }

    return vector;
  }
  function checkIndices(matrix, rowIndices, columnIndices) {
    return {
      row: checkRowIndices(matrix, rowIndices),
      column: checkColumnIndices(matrix, columnIndices)
    };
  }
  function checkRowIndices(matrix, rowIndices) {
    if (typeof rowIndices !== 'object') {
      throw new TypeError('unexpected type for row indices');
    }

    let rowOut = rowIndices.some(r => {
      return r < 0 || r >= matrix.rows;
    });

    if (rowOut) {
      throw new RangeError('row indices are out of range');
    }

    if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
    return rowIndices;
  }
  function checkColumnIndices(matrix, columnIndices) {
    if (typeof columnIndices !== 'object') {
      throw new TypeError('unexpected type for column indices');
    }

    let columnOut = columnIndices.some(c => {
      return c < 0 || c >= matrix.columns;
    });

    if (columnOut) {
      throw new RangeError('column indices are out of range');
    }

    if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
    return columnIndices;
  }
  function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
    if (arguments.length !== 5) {
      throw new RangeError('expected 4 arguments');
    }

    checkNumber('startRow', startRow);
    checkNumber('endRow', endRow);
    checkNumber('startColumn', startColumn);
    checkNumber('endColumn', endColumn);

    if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
      throw new RangeError('Submatrix indices are out of range');
    }
  }
  function newArray(length, value = 0) {
    let array = [];

    for (let i = 0; i < length; i++) {
      array.push(value);
    }

    return array;
  }

  function checkNumber(name, value) {
    if (typeof value !== 'number') {
      throw new TypeError(`${name} must be a number`);
    }
  }

  function sumByRow(matrix) {
    let sum = newArray(matrix.rows);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[i] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumByColumn(matrix) {
    let sum = newArray(matrix.columns);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[j] += matrix.get(i, j);
      }
    }

    return sum;
  }
  function sumAll(matrix) {
    let v = 0;

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        v += matrix.get(i, j);
      }
    }

    return v;
  }
  function productByRow(matrix) {
    let sum = newArray(matrix.rows, 1);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[i] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productByColumn(matrix) {
    let sum = newArray(matrix.columns, 1);

    for (let i = 0; i < matrix.rows; ++i) {
      for (let j = 0; j < matrix.columns; ++j) {
        sum[j] *= matrix.get(i, j);
      }
    }

    return sum;
  }
  function productAll(matrix) {
    let v = 1;

    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        v *= matrix.get(i, j);
      }
    }

    return v;
  }
  function varianceByRow(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (let i = 0; i < rows; i++) {
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean[i];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / cols) / (cols - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / cols) / cols);
      }
    }

    return variance;
  }
  function varianceByColumn(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const variance = [];

    for (let j = 0; j < cols; j++) {
      let sum1 = 0;
      let sum2 = 0;
      let x = 0;

      for (let i = 0; i < rows; i++) {
        x = matrix.get(i, j) - mean[j];
        sum1 += x;
        sum2 += x * x;
      }

      if (unbiased) {
        variance.push((sum2 - sum1 * sum1 / rows) / (rows - 1));
      } else {
        variance.push((sum2 - sum1 * sum1 / rows) / rows);
      }
    }

    return variance;
  }
  function varianceAll(matrix, unbiased, mean) {
    const rows = matrix.rows;
    const cols = matrix.columns;
    const size = rows * cols;
    let sum1 = 0;
    let sum2 = 0;
    let x = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        x = matrix.get(i, j) - mean;
        sum1 += x;
        sum2 += x * x;
      }
    }

    if (unbiased) {
      return (sum2 - sum1 * sum1 / size) / (size - 1);
    } else {
      return (sum2 - sum1 * sum1 / size) / size;
    }
  }
  function centerByRow(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[i]);
      }
    }
  }
  function centerByColumn(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean[j]);
      }
    }
  }
  function centerAll(matrix, mean) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) - mean);
      }
    }
  }
  function getScaleByRow(matrix) {
    const scale = [];

    for (let i = 0; i < matrix.rows; i++) {
      let sum = 0;

      for (let j = 0; j < matrix.columns; j++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.columns - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByRow(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[i]);
      }
    }
  }
  function getScaleByColumn(matrix) {
    const scale = [];

    for (let j = 0; j < matrix.columns; j++) {
      let sum = 0;

      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / (matrix.rows - 1);
      }

      scale.push(Math.sqrt(sum));
    }

    return scale;
  }
  function scaleByColumn(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale[j]);
      }
    }
  }
  function getScaleAll(matrix) {
    const divider = matrix.size - 1;
    let sum = 0;

    for (let j = 0; j < matrix.columns; j++) {
      for (let i = 0; i < matrix.rows; i++) {
        sum += Math.pow(matrix.get(i, j), 2) / divider;
      }
    }

    return Math.sqrt(sum);
  }
  function scaleAll(matrix, scale) {
    for (let i = 0; i < matrix.rows; i++) {
      for (let j = 0; j < matrix.columns; j++) {
        matrix.set(i, j, matrix.get(i, j) / scale);
      }
    }
  }

  class AbstractMatrix {
    static from1DArray(newRows, newColumns, newData) {
      let length = newRows * newColumns;

      if (length !== newData.length) {
        throw new RangeError('data length does not match given dimensions');
      }

      let newMatrix = new Matrix(newRows, newColumns);

      for (let row = 0; row < newRows; row++) {
        for (let column = 0; column < newColumns; column++) {
          newMatrix.set(row, column, newData[row * newColumns + column]);
        }
      }

      return newMatrix;
    }

    static rowVector(newData) {
      let vector = new Matrix(1, newData.length);

      for (let i = 0; i < newData.length; i++) {
        vector.set(0, i, newData[i]);
      }

      return vector;
    }

    static columnVector(newData) {
      let vector = new Matrix(newData.length, 1);

      for (let i = 0; i < newData.length; i++) {
        vector.set(i, 0, newData[i]);
      }

      return vector;
    }

    static zeros(rows, columns) {
      return new Matrix(rows, columns);
    }

    static ones(rows, columns) {
      return new Matrix(rows, columns).fill(1);
    }

    static rand(rows, columns, options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        random = Math.random
      } = options;
      let matrix = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          matrix.set(i, j, random());
        }
      }

      return matrix;
    }

    static randInt(rows, columns, options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1000,
        random = Math.random
      } = options;
      if (!Number.isInteger(min)) throw new TypeError('min must be an integer');
      if (!Number.isInteger(max)) throw new TypeError('max must be an integer');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let interval = max - min;
      let matrix = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          let value = min + Math.round(random() * interval);
          matrix.set(i, j, value);
        }
      }

      return matrix;
    }

    static eye(rows, columns, value) {
      if (columns === undefined) columns = rows;
      if (value === undefined) value = 1;
      let min = Math.min(rows, columns);
      let matrix = this.zeros(rows, columns);

      for (let i = 0; i < min; i++) {
        matrix.set(i, i, value);
      }

      return matrix;
    }

    static diag(data, rows, columns) {
      let l = data.length;
      if (rows === undefined) rows = l;
      if (columns === undefined) columns = rows;
      let min = Math.min(l, rows, columns);
      let matrix = this.zeros(rows, columns);

      for (let i = 0; i < min; i++) {
        matrix.set(i, i, data[i]);
      }

      return matrix;
    }

    static min(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      let rows = matrix1.rows;
      let columns = matrix1.columns;
      let result = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static max(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      let rows = matrix1.rows;
      let columns = matrix1.columns;
      let result = new this(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }

    static checkMatrix(value) {
      return AbstractMatrix.isMatrix(value) ? value : new Matrix(value);
    }

    static isMatrix(value) {
      return value != null && value.klass === 'Matrix';
    }

    get size() {
      return this.rows * this.columns;
    }

    apply(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          callback.call(this, i, j);
        }
      }

      return this;
    }

    to1DArray() {
      let array = [];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          array.push(this.get(i, j));
        }
      }

      return array;
    }

    to2DArray() {
      let copy = [];

      for (let i = 0; i < this.rows; i++) {
        copy.push([]);

        for (let j = 0; j < this.columns; j++) {
          copy[i].push(this.get(i, j));
        }
      }

      return copy;
    }

    toJSON() {
      return this.to2DArray();
    }

    isRowVector() {
      return this.rows === 1;
    }

    isColumnVector() {
      return this.columns === 1;
    }

    isVector() {
      return this.rows === 1 || this.columns === 1;
    }

    isSquare() {
      return this.rows === this.columns;
    }

    isSymmetric() {
      if (this.isSquare()) {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j <= i; j++) {
            if (this.get(i, j) !== this.get(j, i)) {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }

    isEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isEchelonForm = true;
      let checked = false;

      while (i < this.rows && isEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isEchelonForm = false;
            checked = true;
          }
        }

        i++;
      }

      return isEchelonForm;
    }

    isReducedEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isReducedEchelonForm = true;
      let checked = false;

      while (i < this.rows && isReducedEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isReducedEchelonForm = false;
            checked = true;
          }
        }

        for (let k = j + 1; k < this.rows; k++) {
          if (this.get(i, k) !== 0) {
            isReducedEchelonForm = false;
          }
        }

        i++;
      }

      return isReducedEchelonForm;
    }

    echelonForm() {
      let result = this.clone();
      let h = 0;
      let k = 0;

      while (h < result.rows && k < result.columns) {
        let iMax = h;

        for (let i = h; i < result.rows; i++) {
          if (result.get(i, k) > result.get(iMax, k)) {
            iMax = i;
          }
        }

        if (result.get(iMax, k) === 0) {
          k++;
        } else {
          result.swapRows(h, iMax);
          let tmp = result.get(h, k);

          for (let j = k; j < result.columns; j++) {
            result.set(h, j, result.get(h, j) / tmp);
          }

          for (let i = h + 1; i < result.rows; i++) {
            let factor = result.get(i, k) / result.get(h, k);
            result.set(i, k, 0);

            for (let j = k + 1; j < result.columns; j++) {
              result.set(i, j, result.get(i, j) - result.get(h, j) * factor);
            }
          }

          h++;
          k++;
        }
      }

      return result;
    }

    reducedEchelonForm() {
      let result = this.echelonForm();
      let m = result.columns;
      let n = result.rows;
      let h = n - 1;

      while (h >= 0) {
        if (result.maxRow(h) === 0) {
          h--;
        } else {
          let p = 0;
          let pivot = false;

          while (p < n && pivot === false) {
            if (result.get(h, p) === 1) {
              pivot = true;
            } else {
              p++;
            }
          }

          for (let i = 0; i < h; i++) {
            let factor = result.get(i, p);

            for (let j = p; j < m; j++) {
              let tmp = result.get(i, j) - factor * result.get(h, j);
              result.set(i, j, tmp);
            }
          }

          h--;
        }
      }

      return result;
    }

    set() {
      throw new Error('set method is unimplemented');
    }

    get() {
      throw new Error('get method is unimplemented');
    }

    repeat(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        rows = 1,
        columns = 1
      } = options;

      if (!Number.isInteger(rows) || rows <= 0) {
        throw new TypeError('rows must be a positive integer');
      }

      if (!Number.isInteger(columns) || columns <= 0) {
        throw new TypeError('columns must be a positive integer');
      }

      let matrix = new Matrix(this.rows * rows, this.columns * columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          matrix.setSubMatrix(this, this.rows * i, this.columns * j);
        }
      }

      return matrix;
    }

    fill(value) {
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, value);
        }
      }

      return this;
    }

    neg() {
      return this.mulS(-1);
    }

    getRow(index) {
      checkRowIndex(this, index);
      let row = [];

      for (let i = 0; i < this.columns; i++) {
        row.push(this.get(index, i));
      }

      return row;
    }

    getRowVector(index) {
      return Matrix.rowVector(this.getRow(index));
    }

    setRow(index, array) {
      checkRowIndex(this, index);
      array = checkRowVector(this, array);

      for (let i = 0; i < this.columns; i++) {
        this.set(index, i, array[i]);
      }

      return this;
    }

    swapRows(row1, row2) {
      checkRowIndex(this, row1);
      checkRowIndex(this, row2);

      for (let i = 0; i < this.columns; i++) {
        let temp = this.get(row1, i);
        this.set(row1, i, this.get(row2, i));
        this.set(row2, i, temp);
      }

      return this;
    }

    getColumn(index) {
      checkColumnIndex(this, index);
      let column = [];

      for (let i = 0; i < this.rows; i++) {
        column.push(this.get(i, index));
      }

      return column;
    }

    getColumnVector(index) {
      return Matrix.columnVector(this.getColumn(index));
    }

    setColumn(index, array) {
      checkColumnIndex(this, index);
      array = checkColumnVector(this, array);

      for (let i = 0; i < this.rows; i++) {
        this.set(i, index, array[i]);
      }

      return this;
    }

    swapColumns(column1, column2) {
      checkColumnIndex(this, column1);
      checkColumnIndex(this, column2);

      for (let i = 0; i < this.rows; i++) {
        let temp = this.get(i, column1);
        this.set(i, column1, this.get(i, column2));
        this.set(i, column2, temp);
      }

      return this;
    }

    addRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[j]);
        }
      }

      return this;
    }

    subRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[j]);
        }
      }

      return this;
    }

    mulRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[j]);
        }
      }

      return this;
    }

    divRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[j]);
        }
      }

      return this;
    }

    addColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[i]);
        }
      }

      return this;
    }

    subColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[i]);
        }
      }

      return this;
    }

    mulColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[i]);
        }
      }

      return this;
    }

    divColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[i]);
        }
      }

      return this;
    }

    mulRow(index, value) {
      checkRowIndex(this, index);

      for (let i = 0; i < this.columns; i++) {
        this.set(index, i, this.get(index, i) * value);
      }

      return this;
    }

    mulColumn(index, value) {
      checkColumnIndex(this, index);

      for (let i = 0; i < this.rows; i++) {
        this.set(i, index, this.get(i, index) * value);
      }

      return this;
    }

    max() {
      let v = this.get(0, 0);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    maxIndex() {
      let v = this.get(0, 0);
      let idx = [0, 0];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    min() {
      let v = this.get(0, 0);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }

    minIndex() {
      let v = this.get(0, 0);
      let idx = [0, 0];

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }

    maxRow(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    maxRowIndex(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);
      let idx = [row, 0];

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    minRow(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
        }
      }

      return v;
    }

    minRowIndex(row) {
      checkRowIndex(this, row);
      let v = this.get(row, 0);
      let idx = [row, 0];

      for (let i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }

    maxColumn(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    maxColumnIndex(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);
      let idx = [0, column];

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    minColumn(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
        }
      }

      return v;
    }

    minColumnIndex(column) {
      checkColumnIndex(this, column);
      let v = this.get(0, column);
      let idx = [0, column];

      for (let i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }

    diag() {
      let min = Math.min(this.rows, this.columns);
      let diag = [];

      for (let i = 0; i < min; i++) {
        diag.push(this.get(i, i));
      }

      return diag;
    }

    norm(type = 'frobenius') {
      let result = 0;

      if (type === 'max') {
        return this.max();
      } else if (type === 'frobenius') {
        for (let i = 0; i < this.rows; i++) {
          for (let j = 0; j < this.columns; j++) {
            result = result + this.get(i, j) * this.get(i, j);
          }
        }

        return Math.sqrt(result);
      } else {
        throw new RangeError(`unknown norm type: ${type}`);
      }
    }

    cumulativeSum() {
      let sum = 0;

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          sum += this.get(i, j);
          this.set(i, j, sum);
        }
      }

      return this;
    }

    dot(vector2) {
      if (AbstractMatrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
      let vector1 = this.to1DArray();

      if (vector1.length !== vector2.length) {
        throw new RangeError('vectors do not have the same size');
      }

      let dot = 0;

      for (let i = 0; i < vector1.length; i++) {
        dot += vector1[i] * vector2[i];
      }

      return dot;
    }

    mmul(other) {
      other = Matrix.checkMatrix(other);
      let m = this.rows;
      let n = this.columns;
      let p = other.columns;
      let result = new Matrix(m, p);
      let Bcolj = new Float64Array(n);

      for (let j = 0; j < p; j++) {
        for (let k = 0; k < n; k++) {
          Bcolj[k] = other.get(k, j);
        }

        for (let i = 0; i < m; i++) {
          let s = 0;

          for (let k = 0; k < n; k++) {
            s += this.get(i, k) * Bcolj[k];
          }

          result.set(i, j, s);
        }
      }

      return result;
    }

    strassen2x2(other) {
      other = Matrix.checkMatrix(other);
      let result = new Matrix(2, 2);
      const a11 = this.get(0, 0);
      const b11 = other.get(0, 0);
      const a12 = this.get(0, 1);
      const b12 = other.get(0, 1);
      const a21 = this.get(1, 0);
      const b21 = other.get(1, 0);
      const a22 = this.get(1, 1);
      const b22 = other.get(1, 1); // Compute intermediate values.

      const m1 = (a11 + a22) * (b11 + b22);
      const m2 = (a21 + a22) * b11;
      const m3 = a11 * (b12 - b22);
      const m4 = a22 * (b21 - b11);
      const m5 = (a11 + a12) * b22;
      const m6 = (a21 - a11) * (b11 + b12);
      const m7 = (a12 - a22) * (b21 + b22); // Combine intermediate values into the output.

      const c00 = m1 + m4 - m5 + m7;
      const c01 = m3 + m5;
      const c10 = m2 + m4;
      const c11 = m1 - m2 + m3 + m6;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      return result;
    }

    strassen3x3(other) {
      other = Matrix.checkMatrix(other);
      let result = new Matrix(3, 3);
      const a00 = this.get(0, 0);
      const a01 = this.get(0, 1);
      const a02 = this.get(0, 2);
      const a10 = this.get(1, 0);
      const a11 = this.get(1, 1);
      const a12 = this.get(1, 2);
      const a20 = this.get(2, 0);
      const a21 = this.get(2, 1);
      const a22 = this.get(2, 2);
      const b00 = other.get(0, 0);
      const b01 = other.get(0, 1);
      const b02 = other.get(0, 2);
      const b10 = other.get(1, 0);
      const b11 = other.get(1, 1);
      const b12 = other.get(1, 2);
      const b20 = other.get(2, 0);
      const b21 = other.get(2, 1);
      const b22 = other.get(2, 2);
      const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
      const m2 = (a00 - a10) * (-b01 + b11);
      const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
      const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
      const m5 = (a10 + a11) * (-b00 + b01);
      const m6 = a00 * b00;
      const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
      const m8 = (-a00 + a20) * (b02 - b12);
      const m9 = (a20 + a21) * (-b00 + b02);
      const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
      const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
      const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
      const m13 = (a02 - a22) * (b11 - b21);
      const m14 = a02 * b20;
      const m15 = (a21 + a22) * (-b20 + b21);
      const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
      const m17 = (a02 - a12) * (b12 - b22);
      const m18 = (a11 + a12) * (-b20 + b22);
      const m19 = a01 * b10;
      const m20 = a12 * b21;
      const m21 = a10 * b02;
      const m22 = a20 * b01;
      const m23 = a22 * b22;
      const c00 = m6 + m14 + m19;
      const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
      const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
      const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
      const c11 = m2 + m4 + m5 + m6 + m20;
      const c12 = m14 + m16 + m17 + m18 + m21;
      const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
      const c21 = m12 + m13 + m14 + m15 + m22;
      const c22 = m6 + m7 + m8 + m9 + m23;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(0, 2, c02);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      result.set(1, 2, c12);
      result.set(2, 0, c20);
      result.set(2, 1, c21);
      result.set(2, 2, c22);
      return result;
    }

    mmulStrassen(y) {
      y = Matrix.checkMatrix(y);
      let x = this.clone();
      let r1 = x.rows;
      let c1 = x.columns;
      let r2 = y.rows;
      let c2 = y.columns;

      if (c1 !== r2) {
        // eslint-disable-next-line no-console
        console.warn(`Multiplying ${r1} x ${c1} and ${r2} x ${c2} matrix: dimensions do not match.`);
      } // Put a matrix into the top left of a matrix of zeros.
      // `rows` and `cols` are the dimensions of the output matrix.


      function embed(mat, rows, cols) {
        let r = mat.rows;
        let c = mat.columns;

        if (r === rows && c === cols) {
          return mat;
        } else {
          let resultat = AbstractMatrix.zeros(rows, cols);
          resultat = resultat.setSubMatrix(mat, 0, 0);
          return resultat;
        }
      } // Make sure both matrices are the same size.
      // This is exclusively for simplicity:
      // this algorithm can be implemented with matrices of different sizes.


      let r = Math.max(r1, r2);
      let c = Math.max(c1, c2);
      x = embed(x, r, c);
      y = embed(y, r, c); // Our recursive multiplication function.

      function blockMult(a, b, rows, cols) {
        // For small matrices, resort to naive multiplication.
        if (rows <= 512 || cols <= 512) {
          return a.mmul(b); // a is equivalent to this
        } // Apply dynamic padding.


        if (rows % 2 === 1 && cols % 2 === 1) {
          a = embed(a, rows + 1, cols + 1);
          b = embed(b, rows + 1, cols + 1);
        } else if (rows % 2 === 1) {
          a = embed(a, rows + 1, cols);
          b = embed(b, rows + 1, cols);
        } else if (cols % 2 === 1) {
          a = embed(a, rows, cols + 1);
          b = embed(b, rows, cols + 1);
        }

        let halfRows = parseInt(a.rows / 2, 10);
        let halfCols = parseInt(a.columns / 2, 10); // Subdivide input matrices.

        let a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        let b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        let a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
        let b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
        let a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
        let b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
        let a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
        let b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1); // Compute intermediate values.

        let m1 = blockMult(AbstractMatrix.add(a11, a22), AbstractMatrix.add(b11, b22), halfRows, halfCols);
        let m2 = blockMult(AbstractMatrix.add(a21, a22), b11, halfRows, halfCols);
        let m3 = blockMult(a11, AbstractMatrix.sub(b12, b22), halfRows, halfCols);
        let m4 = blockMult(a22, AbstractMatrix.sub(b21, b11), halfRows, halfCols);
        let m5 = blockMult(AbstractMatrix.add(a11, a12), b22, halfRows, halfCols);
        let m6 = blockMult(AbstractMatrix.sub(a21, a11), AbstractMatrix.add(b11, b12), halfRows, halfCols);
        let m7 = blockMult(AbstractMatrix.sub(a12, a22), AbstractMatrix.add(b21, b22), halfRows, halfCols); // Combine intermediate values into the output.

        let c11 = AbstractMatrix.add(m1, m4);
        c11.sub(m5);
        c11.add(m7);
        let c12 = AbstractMatrix.add(m3, m5);
        let c21 = AbstractMatrix.add(m2, m4);
        let c22 = AbstractMatrix.sub(m1, m2);
        c22.add(m3);
        c22.add(m6); // Crop output to the desired size (undo dynamic padding).

        let resultat = AbstractMatrix.zeros(2 * c11.rows, 2 * c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0);
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
      }

      return blockMult(x, y, r, c);
    }

    scaleRows(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let i = 0; i < this.rows; i++) {
        const row = this.getRow(i);
        rescale(row, {
          min,
          max,
          output: row
        });
        newMatrix.setRow(i, row);
      }

      return newMatrix;
    }

    scaleColumns(options = {}) {
      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        min = 0,
        max = 1
      } = options;
      if (!Number.isFinite(min)) throw new TypeError('min must be a number');
      if (!Number.isFinite(max)) throw new TypeError('max must be a number');
      if (min >= max) throw new RangeError('min must be smaller than max');
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let i = 0; i < this.columns; i++) {
        const column = this.getColumn(i);
        rescale(column, {
          min: min,
          max: max,
          output: column
        });
        newMatrix.setColumn(i, column);
      }

      return newMatrix;
    }

    flipRows() {
      const middle = Math.ceil(this.columns / 2);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < middle; j++) {
          let first = this.get(i, j);
          let last = this.get(i, this.columns - 1 - j);
          this.set(i, j, last);
          this.set(i, this.columns - 1 - j, first);
        }
      }

      return this;
    }

    flipColumns() {
      const middle = Math.ceil(this.rows / 2);

      for (let j = 0; j < this.columns; j++) {
        for (let i = 0; i < middle; i++) {
          let first = this.get(i, j);
          let last = this.get(this.rows - 1 - i, j);
          this.set(i, j, last);
          this.set(this.rows - 1 - i, j, first);
        }
      }

      return this;
    }

    kroneckerProduct(other) {
      other = Matrix.checkMatrix(other);
      let m = this.rows;
      let n = this.columns;
      let p = other.rows;
      let q = other.columns;
      let result = new Matrix(m * p, n * q);

      for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
          for (let k = 0; k < p; k++) {
            for (let l = 0; l < q; l++) {
              result.set(p * i + k, q * j + l, this.get(i, j) * other.get(k, l));
            }
          }
        }
      }

      return result;
    }

    transpose() {
      let result = new Matrix(this.columns, this.rows);

      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.columns; j++) {
          result.set(j, i, this.get(i, j));
        }
      }

      return result;
    }

    sortRows(compareFunction = compareNumbers) {
      for (let i = 0; i < this.rows; i++) {
        this.setRow(i, this.getRow(i).sort(compareFunction));
      }

      return this;
    }

    sortColumns(compareFunction = compareNumbers) {
      for (let i = 0; i < this.columns; i++) {
        this.setColumn(i, this.getColumn(i).sort(compareFunction));
      }

      return this;
    }

    subMatrix(startRow, endRow, startColumn, endColumn) {
      checkRange(this, startRow, endRow, startColumn, endColumn);
      let newMatrix = new Matrix(endRow - startRow + 1, endColumn - startColumn + 1);

      for (let i = startRow; i <= endRow; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          newMatrix.set(i - startRow, j - startColumn, this.get(i, j));
        }
      }

      return newMatrix;
    }

    subMatrixRow(indices, startColumn, endColumn) {
      if (startColumn === undefined) startColumn = 0;
      if (endColumn === undefined) endColumn = this.columns - 1;

      if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
        throw new RangeError('Argument out of range');
      }

      let newMatrix = new Matrix(indices.length, endColumn - startColumn + 1);

      for (let i = 0; i < indices.length; i++) {
        for (let j = startColumn; j <= endColumn; j++) {
          if (indices[i] < 0 || indices[i] >= this.rows) {
            throw new RangeError(`Row index out of range: ${indices[i]}`);
          }

          newMatrix.set(i, j - startColumn, this.get(indices[i], j));
        }
      }

      return newMatrix;
    }

    subMatrixColumn(indices, startRow, endRow) {
      if (startRow === undefined) startRow = 0;
      if (endRow === undefined) endRow = this.rows - 1;

      if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
        throw new RangeError('Argument out of range');
      }

      let newMatrix = new Matrix(endRow - startRow + 1, indices.length);

      for (let i = 0; i < indices.length; i++) {
        for (let j = startRow; j <= endRow; j++) {
          if (indices[i] < 0 || indices[i] >= this.columns) {
            throw new RangeError(`Column index out of range: ${indices[i]}`);
          }

          newMatrix.set(j - startRow, i, this.get(j, indices[i]));
        }
      }

      return newMatrix;
    }

    setSubMatrix(matrix, startRow, startColumn) {
      matrix = Matrix.checkMatrix(matrix);
      let endRow = startRow + matrix.rows - 1;
      let endColumn = startColumn + matrix.columns - 1;
      checkRange(this, startRow, endRow, startColumn, endColumn);

      for (let i = 0; i < matrix.rows; i++) {
        for (let j = 0; j < matrix.columns; j++) {
          this.set(startRow + i, startColumn + j, matrix.get(i, j));
        }
      }

      return this;
    }

    selection(rowIndices, columnIndices) {
      let indices = checkIndices(this, rowIndices, columnIndices);
      let newMatrix = new Matrix(rowIndices.length, columnIndices.length);

      for (let i = 0; i < indices.row.length; i++) {
        let rowIndex = indices.row[i];

        for (let j = 0; j < indices.column.length; j++) {
          let columnIndex = indices.column[j];
          newMatrix.set(i, j, this.get(rowIndex, columnIndex));
        }
      }

      return newMatrix;
    }

    trace() {
      let min = Math.min(this.rows, this.columns);
      let trace = 0;

      for (let i = 0; i < min; i++) {
        trace += this.get(i, i);
      }

      return trace;
    }

    clone() {
      let newMatrix = new Matrix(this.rows, this.columns);

      for (let row = 0; row < this.rows; row++) {
        for (let column = 0; column < this.columns; column++) {
          newMatrix.set(row, column, this.get(row, column));
        }
      }

      return newMatrix;
    }

    sum(by) {
      switch (by) {
        case 'row':
          return sumByRow(this);

        case 'column':
          return sumByColumn(this);

        case undefined:
          return sumAll(this);

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    product(by) {
      switch (by) {
        case 'row':
          return productByRow(this);

        case 'column':
          return productByColumn(this);

        case undefined:
          return productAll(this);

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    mean(by) {
      const sum = this.sum(by);

      switch (by) {
        case 'row':
          {
            for (let i = 0; i < this.rows; i++) {
              sum[i] /= this.columns;
            }

            return sum;
          }

        case 'column':
          {
            for (let i = 0; i < this.columns; i++) {
              sum[i] /= this.rows;
            }

            return sum;
          }

        case undefined:
          return sum / this.size;

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    variance(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        unbiased = true,
        mean = this.mean(by)
      } = options;

      if (typeof unbiased !== 'boolean') {
        throw new TypeError('unbiased must be a boolean');
      }

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByRow(this, unbiased, mean);
          }

        case 'column':
          {
            if (!Array.isArray(mean)) {
              throw new TypeError('mean must be an array');
            }

            return varianceByColumn(this, unbiased, mean);
          }

        case undefined:
          {
            if (typeof mean !== 'number') {
              throw new TypeError('mean must be a number');
            }

            return varianceAll(this, unbiased, mean);
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    standardDeviation(by, options) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      const variance = this.variance(by, options);

      if (by === undefined) {
        return Math.sqrt(variance);
      } else {
        for (let i = 0; i < variance.length; i++) {
          variance[i] = Math.sqrt(variance[i]);
        }

        return variance;
      }
    }

    center(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      const {
        center = this.mean(by)
      } = options;

      switch (by) {
        case 'row':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByRow(this, center);
            return this;
          }

        case 'column':
          {
            if (!Array.isArray(center)) {
              throw new TypeError('center must be an array');
            }

            centerByColumn(this, center);
            return this;
          }

        case undefined:
          {
            if (typeof center !== 'number') {
              throw new TypeError('center must be a number');
            }

            centerAll(this, center);
            return this;
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    scale(by, options = {}) {
      if (typeof by === 'object') {
        options = by;
        by = undefined;
      }

      if (typeof options !== 'object') {
        throw new TypeError('options must be an object');
      }

      let scale = options.scale;

      switch (by) {
        case 'row':
          {
            if (scale === undefined) {
              scale = getScaleByRow(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByRow(this, scale);
            return this;
          }

        case 'column':
          {
            if (scale === undefined) {
              scale = getScaleByColumn(this);
            } else if (!Array.isArray(scale)) {
              throw new TypeError('scale must be an array');
            }

            scaleByColumn(this, scale);
            return this;
          }

        case undefined:
          {
            if (scale === undefined) {
              scale = getScaleAll(this);
            } else if (typeof scale !== 'number') {
              throw new TypeError('scale must be a number');
            }

            scaleAll(this, scale);
            return this;
          }

        default:
          throw new Error(`invalid option: ${by}`);
      }
    }

    toString(options) {
      return inspectMatrixWithOptions(this, options);
    }

  }
  AbstractMatrix.prototype.klass = 'Matrix';

  if (typeof Symbol !== 'undefined') {
    AbstractMatrix.prototype[Symbol.for('nodejs.util.inspect.custom')] = inspectMatrix;
  }

  function compareNumbers(a, b) {
    return a - b;
  } // Synonyms


  AbstractMatrix.random = AbstractMatrix.rand;
  AbstractMatrix.randomInt = AbstractMatrix.randInt;
  AbstractMatrix.diagonal = AbstractMatrix.diag;
  AbstractMatrix.prototype.diagonal = AbstractMatrix.prototype.diag;
  AbstractMatrix.identity = AbstractMatrix.eye;
  AbstractMatrix.prototype.negate = AbstractMatrix.prototype.neg;
  AbstractMatrix.prototype.tensorProduct = AbstractMatrix.prototype.kroneckerProduct;
  class Matrix extends AbstractMatrix {
    constructor(nRows, nColumns) {
      super();

      if (Matrix.isMatrix(nRows)) {
        return nRows.clone();
      } else if (Number.isInteger(nRows) && nRows > 0) {
        // Create an empty matrix
        this.data = [];

        if (Number.isInteger(nColumns) && nColumns > 0) {
          for (let i = 0; i < nRows; i++) {
            this.data.push(new Float64Array(nColumns));
          }
        } else {
          throw new TypeError('nColumns must be a positive integer');
        }
      } else if (Array.isArray(nRows)) {
        // Copy the values from the 2D array
        const arrayData = nRows;
        nRows = arrayData.length;
        nColumns = arrayData[0].length;

        if (typeof nColumns !== 'number' || nColumns === 0) {
          throw new TypeError('Data must be a 2D array with at least one element');
        }

        this.data = [];

        for (let i = 0; i < nRows; i++) {
          if (arrayData[i].length !== nColumns) {
            throw new RangeError('Inconsistent array dimensions');
          }

          this.data.push(Float64Array.from(arrayData[i]));
        }
      } else {
        throw new TypeError('First argument must be a positive number or an array');
      }

      this.rows = nRows;
      this.columns = nColumns;
      return this;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

    removeRow(index) {
      checkRowIndex(this, index);

      if (this.rows === 1) {
        throw new RangeError('A matrix cannot have less than one row');
      }

      this.data.splice(index, 1);
      this.rows -= 1;
      return this;
    }

    addRow(index, array) {
      if (array === undefined) {
        array = index;
        index = this.rows;
      }

      checkRowIndex(this, index, true);
      array = Float64Array.from(checkRowVector(this, array));
      this.data.splice(index, 0, array);
      this.rows += 1;
      return this;
    }

    removeColumn(index) {
      checkColumnIndex(this, index);

      if (this.columns === 1) {
        throw new RangeError('A matrix cannot have less than one column');
      }

      for (let i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns - 1);

        for (let j = 0; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        for (let j = index + 1; j < this.columns; j++) {
          newRow[j - 1] = this.data[i][j];
        }

        this.data[i] = newRow;
      }

      this.columns -= 1;
      return this;
    }

    addColumn(index, array) {
      if (typeof array === 'undefined') {
        array = index;
        index = this.columns;
      }

      checkColumnIndex(this, index, true);
      array = checkColumnVector(this, array);

      for (let i = 0; i < this.rows; i++) {
        const newRow = new Float64Array(this.columns + 1);
        let j = 0;

        for (; j < index; j++) {
          newRow[j] = this.data[i][j];
        }

        newRow[j++] = array[i];

        for (; j < this.columns + 1; j++) {
          newRow[j] = this.data[i][j - 1];
        }

        this.data[i] = newRow;
      }

      this.columns += 1;
      return this;
    }

  }
  installMathOperations(AbstractMatrix, Matrix);

  class BaseView extends AbstractMatrix {
    constructor(matrix, rows, columns) {
      super();
      this.matrix = matrix;
      this.rows = rows;
      this.columns = columns;
    }

  }

  class MatrixTransposeView extends BaseView {
    constructor(matrix) {
      super(matrix, matrix.columns, matrix.rows);
    }

    set(rowIndex, columnIndex, value) {
      this.matrix.set(columnIndex, rowIndex, value);
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.matrix.get(columnIndex, rowIndex);
    }

  }

  class WrapperMatrix2D extends AbstractMatrix {
    constructor(data) {
      super();
      this.data = data;
      this.rows = data.length;
      this.columns = data[0].length;
    }

    set(rowIndex, columnIndex, value) {
      this.data[rowIndex][columnIndex] = value;
      return this;
    }

    get(rowIndex, columnIndex) {
      return this.data[rowIndex][columnIndex];
    }

  }

  class LuDecomposition {
    constructor(matrix) {
      matrix = WrapperMatrix2D.checkMatrix(matrix);
      let lu = matrix.clone();
      let rows = lu.rows;
      let columns = lu.columns;
      let pivotVector = new Float64Array(rows);
      let pivotSign = 1;
      let i, j, k, p, s, t, v;
      let LUcolj, kmax;

      for (i = 0; i < rows; i++) {
        pivotVector[i] = i;
      }

      LUcolj = new Float64Array(rows);

      for (j = 0; j < columns; j++) {
        for (i = 0; i < rows; i++) {
          LUcolj[i] = lu.get(i, j);
        }

        for (i = 0; i < rows; i++) {
          kmax = Math.min(i, j);
          s = 0;

          for (k = 0; k < kmax; k++) {
            s += lu.get(i, k) * LUcolj[k];
          }

          LUcolj[i] -= s;
          lu.set(i, j, LUcolj[i]);
        }

        p = j;

        for (i = j + 1; i < rows; i++) {
          if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
            p = i;
          }
        }

        if (p !== j) {
          for (k = 0; k < columns; k++) {
            t = lu.get(p, k);
            lu.set(p, k, lu.get(j, k));
            lu.set(j, k, t);
          }

          v = pivotVector[p];
          pivotVector[p] = pivotVector[j];
          pivotVector[j] = v;
          pivotSign = -pivotSign;
        }

        if (j < rows && lu.get(j, j) !== 0) {
          for (i = j + 1; i < rows; i++) {
            lu.set(i, j, lu.get(i, j) / lu.get(j, j));
          }
        }
      }

      this.LU = lu;
      this.pivotVector = pivotVector;
      this.pivotSign = pivotSign;
    }

    isSingular() {
      let data = this.LU;
      let col = data.columns;

      for (let j = 0; j < col; j++) {
        if (data.get(j, j) === 0) {
          return true;
        }
      }

      return false;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      let lu = this.LU;
      let rows = lu.rows;

      if (rows !== value.rows) {
        throw new Error('Invalid matrix dimensions');
      }

      if (this.isSingular()) {
        throw new Error('LU matrix is singular');
      }

      let count = value.columns;
      let X = value.subMatrixRow(this.pivotVector, 0, count - 1);
      let columns = lu.columns;
      let i, j, k;

      for (k = 0; k < columns; k++) {
        for (i = k + 1; i < columns; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      for (k = columns - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / lu.get(k, k));
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * lu.get(i, k));
          }
        }
      }

      return X;
    }

    get determinant() {
      let data = this.LU;

      if (!data.isSquare()) {
        throw new Error('Matrix must be square');
      }

      let determinant = this.pivotSign;
      let col = data.columns;

      for (let j = 0; j < col; j++) {
        determinant *= data.get(j, j);
      }

      return determinant;
    }

    get lowerTriangularMatrix() {
      let data = this.LU;
      let rows = data.rows;
      let columns = data.columns;
      let X = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (i > j) {
            X.set(i, j, data.get(i, j));
          } else if (i === j) {
            X.set(i, j, 1);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get upperTriangularMatrix() {
      let data = this.LU;
      let rows = data.rows;
      let columns = data.columns;
      let X = new Matrix(rows, columns);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          if (i <= j) {
            X.set(i, j, data.get(i, j));
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get pivotPermutationVector() {
      return Array.from(this.pivotVector);
    }

  }

  function hypotenuse(a, b) {
    let r = 0;

    if (Math.abs(a) > Math.abs(b)) {
      r = b / a;
      return Math.abs(a) * Math.sqrt(1 + r * r);
    }

    if (b !== 0) {
      r = a / b;
      return Math.abs(b) * Math.sqrt(1 + r * r);
    }

    return 0;
  }

  class QrDecomposition {
    constructor(value) {
      value = WrapperMatrix2D.checkMatrix(value);
      let qr = value.clone();
      let m = value.rows;
      let n = value.columns;
      let rdiag = new Float64Array(n);
      let i, j, k, s;

      for (k = 0; k < n; k++) {
        let nrm = 0;

        for (i = k; i < m; i++) {
          nrm = hypotenuse(nrm, qr.get(i, k));
        }

        if (nrm !== 0) {
          if (qr.get(k, k) < 0) {
            nrm = -nrm;
          }

          for (i = k; i < m; i++) {
            qr.set(i, k, qr.get(i, k) / nrm);
          }

          qr.set(k, k, qr.get(k, k) + 1);

          for (j = k + 1; j < n; j++) {
            s = 0;

            for (i = k; i < m; i++) {
              s += qr.get(i, k) * qr.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < m; i++) {
              qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
            }
          }
        }

        rdiag[k] = -nrm;
      }

      this.QR = qr;
      this.Rdiag = rdiag;
    }

    solve(value) {
      value = Matrix.checkMatrix(value);
      let qr = this.QR;
      let m = qr.rows;

      if (value.rows !== m) {
        throw new Error('Matrix row dimensions must agree');
      }

      if (!this.isFullRank()) {
        throw new Error('Matrix is rank deficient');
      }

      let count = value.columns;
      let X = value.clone();
      let n = qr.columns;
      let i, j, k, s;

      for (k = 0; k < n; k++) {
        for (j = 0; j < count; j++) {
          s = 0;

          for (i = k; i < m; i++) {
            s += qr.get(i, k) * X.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < m; i++) {
            X.set(i, j, X.get(i, j) + s * qr.get(i, k));
          }
        }
      }

      for (k = n - 1; k >= 0; k--) {
        for (j = 0; j < count; j++) {
          X.set(k, j, X.get(k, j) / this.Rdiag[k]);
        }

        for (i = 0; i < k; i++) {
          for (j = 0; j < count; j++) {
            X.set(i, j, X.get(i, j) - X.get(k, j) * qr.get(i, k));
          }
        }
      }

      return X.subMatrix(0, n - 1, 0, count - 1);
    }

    isFullRank() {
      let columns = this.QR.columns;

      for (let i = 0; i < columns; i++) {
        if (this.Rdiag[i] === 0) {
          return false;
        }
      }

      return true;
    }

    get upperTriangularMatrix() {
      let qr = this.QR;
      let n = qr.columns;
      let X = new Matrix(n, n);
      let i, j;

      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          if (i < j) {
            X.set(i, j, qr.get(i, j));
          } else if (i === j) {
            X.set(i, j, this.Rdiag[i]);
          } else {
            X.set(i, j, 0);
          }
        }
      }

      return X;
    }

    get orthogonalMatrix() {
      let qr = this.QR;
      let rows = qr.rows;
      let columns = qr.columns;
      let X = new Matrix(rows, columns);
      let i, j, k, s;

      for (k = columns - 1; k >= 0; k--) {
        for (i = 0; i < rows; i++) {
          X.set(i, k, 0);
        }

        X.set(k, k, 1);

        for (j = k; j < columns; j++) {
          if (qr.get(k, k) !== 0) {
            s = 0;

            for (i = k; i < rows; i++) {
              s += qr.get(i, k) * X.get(i, j);
            }

            s = -s / qr.get(k, k);

            for (i = k; i < rows; i++) {
              X.set(i, j, X.get(i, j) + s * qr.get(i, k));
            }
          }
        }
      }

      return X;
    }

  }

  class SingularValueDecomposition {
    constructor(value, options = {}) {
      value = WrapperMatrix2D.checkMatrix(value);
      let m = value.rows;
      let n = value.columns;
      const {
        computeLeftSingularVectors = true,
        computeRightSingularVectors = true,
        autoTranspose = false
      } = options;
      let wantu = Boolean(computeLeftSingularVectors);
      let wantv = Boolean(computeRightSingularVectors);
      let swapped = false;
      let a;

      if (m < n) {
        if (!autoTranspose) {
          a = value.clone(); // eslint-disable-next-line no-console

          console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
        } else {
          a = value.transpose();
          m = a.rows;
          n = a.columns;
          swapped = true;
          let aux = wantu;
          wantu = wantv;
          wantv = aux;
        }
      } else {
        a = value.clone();
      }

      let nu = Math.min(m, n);
      let ni = Math.min(m + 1, n);
      let s = new Float64Array(ni);
      let U = new Matrix(m, nu);
      let V = new Matrix(n, n);
      let e = new Float64Array(n);
      let work = new Float64Array(m);
      let si = new Float64Array(ni);

      for (let i = 0; i < ni; i++) si[i] = i;

      let nct = Math.min(m - 1, n);
      let nrt = Math.max(0, Math.min(n - 2, m));
      let mrc = Math.max(nct, nrt);

      for (let k = 0; k < mrc; k++) {
        if (k < nct) {
          s[k] = 0;

          for (let i = k; i < m; i++) {
            s[k] = hypotenuse(s[k], a.get(i, k));
          }

          if (s[k] !== 0) {
            if (a.get(k, k) < 0) {
              s[k] = -s[k];
            }

            for (let i = k; i < m; i++) {
              a.set(i, k, a.get(i, k) / s[k]);
            }

            a.set(k, k, a.get(k, k) + 1);
          }

          s[k] = -s[k];
        }

        for (let j = k + 1; j < n; j++) {
          if (k < nct && s[k] !== 0) {
            let t = 0;

            for (let i = k; i < m; i++) {
              t += a.get(i, k) * a.get(i, j);
            }

            t = -t / a.get(k, k);

            for (let i = k; i < m; i++) {
              a.set(i, j, a.get(i, j) + t * a.get(i, k));
            }
          }

          e[j] = a.get(k, j);
        }

        if (wantu && k < nct) {
          for (let i = k; i < m; i++) {
            U.set(i, k, a.get(i, k));
          }
        }

        if (k < nrt) {
          e[k] = 0;

          for (let i = k + 1; i < n; i++) {
            e[k] = hypotenuse(e[k], e[i]);
          }

          if (e[k] !== 0) {
            if (e[k + 1] < 0) {
              e[k] = 0 - e[k];
            }

            for (let i = k + 1; i < n; i++) {
              e[i] /= e[k];
            }

            e[k + 1] += 1;
          }

          e[k] = -e[k];

          if (k + 1 < m && e[k] !== 0) {
            for (let i = k + 1; i < m; i++) {
              work[i] = 0;
            }

            for (let i = k + 1; i < m; i++) {
              for (let j = k + 1; j < n; j++) {
                work[i] += e[j] * a.get(i, j);
              }
            }

            for (let j = k + 1; j < n; j++) {
              let t = -e[j] / e[k + 1];

              for (let i = k + 1; i < m; i++) {
                a.set(i, j, a.get(i, j) + t * work[i]);
              }
            }
          }

          if (wantv) {
            for (let i = k + 1; i < n; i++) {
              V.set(i, k, e[i]);
            }
          }
        }
      }

      let p = Math.min(n, m + 1);

      if (nct < n) {
        s[nct] = a.get(nct, nct);
      }

      if (m < p) {
        s[p - 1] = 0;
      }

      if (nrt + 1 < p) {
        e[nrt] = a.get(nrt, p - 1);
      }

      e[p - 1] = 0;

      if (wantu) {
        for (let j = nct; j < nu; j++) {
          for (let i = 0; i < m; i++) {
            U.set(i, j, 0);
          }

          U.set(j, j, 1);
        }

        for (let k = nct - 1; k >= 0; k--) {
          if (s[k] !== 0) {
            for (let j = k + 1; j < nu; j++) {
              let t = 0;

              for (let i = k; i < m; i++) {
                t += U.get(i, k) * U.get(i, j);
              }

              t = -t / U.get(k, k);

              for (let i = k; i < m; i++) {
                U.set(i, j, U.get(i, j) + t * U.get(i, k));
              }
            }

            for (let i = k; i < m; i++) {
              U.set(i, k, -U.get(i, k));
            }

            U.set(k, k, 1 + U.get(k, k));

            for (let i = 0; i < k - 1; i++) {
              U.set(i, k, 0);
            }
          } else {
            for (let i = 0; i < m; i++) {
              U.set(i, k, 0);
            }

            U.set(k, k, 1);
          }
        }
      }

      if (wantv) {
        for (let k = n - 1; k >= 0; k--) {
          if (k < nrt && e[k] !== 0) {
            for (let j = k + 1; j < n; j++) {
              let t = 0;

              for (let i = k + 1; i < n; i++) {
                t += V.get(i, k) * V.get(i, j);
              }

              t = -t / V.get(k + 1, k);

              for (let i = k + 1; i < n; i++) {
                V.set(i, j, V.get(i, j) + t * V.get(i, k));
              }
            }
          }

          for (let i = 0; i < n; i++) {
            V.set(i, k, 0);
          }

          V.set(k, k, 1);
        }
      }

      let pp = p - 1;
      let eps = Number.EPSILON;

      while (p > 0) {
        let k, kase;

        for (k = p - 2; k >= -1; k--) {
          if (k === -1) {
            break;
          }

          const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));

          if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
            e[k] = 0;
            break;
          }
        }

        if (k === p - 2) {
          kase = 4;
        } else {
          let ks;

          for (ks = p - 1; ks >= k; ks--) {
            if (ks === k) {
              break;
            }

            let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);

            if (Math.abs(s[ks]) <= eps * t) {
              s[ks] = 0;
              break;
            }
          }

          if (ks === k) {
            kase = 3;
          } else if (ks === p - 1) {
            kase = 1;
          } else {
            kase = 2;
            k = ks;
          }
        }

        k++;

        switch (kase) {
          case 1:
            {
              let f = e[p - 2];
              e[p - 2] = 0;

              for (let j = p - 2; j >= k; j--) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;

                if (j !== k) {
                  f = -sn * e[j - 1];
                  e[j - 1] = cs * e[j - 1];
                }

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, p - 1);
                    V.set(i, p - 1, -sn * V.get(i, j) + cs * V.get(i, p - 1));
                    V.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 2:
            {
              let f = e[k - 1];
              e[k - 1] = 0;

              for (let j = k; j < p; j++) {
                let t = hypotenuse(s[j], f);
                let cs = s[j] / t;
                let sn = f / t;
                s[j] = t;
                f = -sn * e[j];
                e[j] = cs * e[j];

                if (wantu) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, k - 1);
                    U.set(i, k - 1, -sn * U.get(i, j) + cs * U.get(i, k - 1));
                    U.set(i, j, t);
                  }
                }
              }

              break;
            }

          case 3:
            {
              const scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
              const sp = s[p - 1] / scale;
              const spm1 = s[p - 2] / scale;
              const epm1 = e[p - 2] / scale;
              const sk = s[k] / scale;
              const ek = e[k] / scale;
              const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
              const c = sp * epm1 * (sp * epm1);
              let shift = 0;

              if (b !== 0 || c !== 0) {
                if (b < 0) {
                  shift = 0 - Math.sqrt(b * b + c);
                } else {
                  shift = Math.sqrt(b * b + c);
                }

                shift = c / (b + shift);
              }

              let f = (sk + sp) * (sk - sp) + shift;
              let g = sk * ek;

              for (let j = k; j < p - 1; j++) {
                let t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                let cs = f / t;
                let sn = g / t;

                if (j !== k) {
                  e[j - 1] = t;
                }

                f = cs * s[j] + sn * e[j];
                e[j] = cs * e[j] - sn * s[j];
                g = sn * s[j + 1];
                s[j + 1] = cs * s[j + 1];

                if (wantv) {
                  for (let i = 0; i < n; i++) {
                    t = cs * V.get(i, j) + sn * V.get(i, j + 1);
                    V.set(i, j + 1, -sn * V.get(i, j) + cs * V.get(i, j + 1));
                    V.set(i, j, t);
                  }
                }

                t = hypotenuse(f, g);
                if (t === 0) t = Number.MIN_VALUE;
                cs = f / t;
                sn = g / t;
                s[j] = t;
                f = cs * e[j] + sn * s[j + 1];
                s[j + 1] = -sn * e[j] + cs * s[j + 1];
                g = sn * e[j + 1];
                e[j + 1] = cs * e[j + 1];

                if (wantu && j < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = cs * U.get(i, j) + sn * U.get(i, j + 1);
                    U.set(i, j + 1, -sn * U.get(i, j) + cs * U.get(i, j + 1));
                    U.set(i, j, t);
                  }
                }
              }

              e[p - 2] = f;
              break;
            }

          case 4:
            {
              if (s[k] <= 0) {
                s[k] = s[k] < 0 ? -s[k] : 0;

                if (wantv) {
                  for (let i = 0; i <= pp; i++) {
                    V.set(i, k, -V.get(i, k));
                  }
                }
              }

              while (k < pp) {
                if (s[k] >= s[k + 1]) {
                  break;
                }

                let t = s[k];
                s[k] = s[k + 1];
                s[k + 1] = t;

                if (wantv && k < n - 1) {
                  for (let i = 0; i < n; i++) {
                    t = V.get(i, k + 1);
                    V.set(i, k + 1, V.get(i, k));
                    V.set(i, k, t);
                  }
                }

                if (wantu && k < m - 1) {
                  for (let i = 0; i < m; i++) {
                    t = U.get(i, k + 1);
                    U.set(i, k + 1, U.get(i, k));
                    U.set(i, k, t);
                  }
                }

                k++;
              }
              p--;
              break;
            }
          // no default
        }
      }

      if (swapped) {
        let tmp = V;
        V = U;
        U = tmp;
      }

      this.m = m;
      this.n = n;
      this.s = s;
      this.U = U;
      this.V = V;
    }

    solve(value) {
      let Y = value;
      let e = this.threshold;
      let scols = this.s.length;
      let Ls = Matrix.zeros(scols, scols);

      for (let i = 0; i < scols; i++) {
        if (Math.abs(this.s[i]) <= e) {
          Ls.set(i, i, 0);
        } else {
          Ls.set(i, i, 1 / this.s[i]);
        }
      }

      let U = this.U;
      let V = this.rightSingularVectors;
      let VL = V.mmul(Ls);
      let vrows = V.rows;
      let urows = U.rows;
      let VLU = Matrix.zeros(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < scols; k++) {
            sum += VL.get(i, k) * U.get(j, k);
          }

          VLU.set(i, j, sum);
        }
      }

      return VLU.mmul(Y);
    }

    solveForDiagonal(value) {
      return this.solve(Matrix.diag(value));
    }

    inverse() {
      let V = this.V;
      let e = this.threshold;
      let vrows = V.rows;
      let vcols = V.columns;
      let X = new Matrix(vrows, this.s.length);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < vcols; j++) {
          if (Math.abs(this.s[j]) > e) {
            X.set(i, j, V.get(i, j) / this.s[j]);
          }
        }
      }

      let U = this.U;
      let urows = U.rows;
      let ucols = U.columns;
      let Y = new Matrix(vrows, urows);

      for (let i = 0; i < vrows; i++) {
        for (let j = 0; j < urows; j++) {
          let sum = 0;

          for (let k = 0; k < ucols; k++) {
            sum += X.get(i, k) * U.get(j, k);
          }

          Y.set(i, j, sum);
        }
      }

      return Y;
    }

    get condition() {
      return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
    }

    get norm2() {
      return this.s[0];
    }

    get rank() {
      let tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
      let r = 0;
      let s = this.s;

      for (let i = 0, ii = s.length; i < ii; i++) {
        if (s[i] > tol) {
          r++;
        }
      }

      return r;
    }

    get diagonal() {
      return Array.from(this.s);
    }

    get threshold() {
      return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
    }

    get leftSingularVectors() {
      return this.U;
    }

    get rightSingularVectors() {
      return this.V;
    }

    get diagonalMatrix() {
      return Matrix.diag(this.s);
    }

  }

  function inverse(matrix, useSVD = false) {
    matrix = WrapperMatrix2D.checkMatrix(matrix);

    if (useSVD) {
      return new SingularValueDecomposition(matrix).inverse();
    } else {
      return solve(matrix, Matrix.eye(matrix.rows));
    }
  }
  function solve(leftHandSide, rightHandSide, useSVD = false) {
    leftHandSide = WrapperMatrix2D.checkMatrix(leftHandSide);
    rightHandSide = WrapperMatrix2D.checkMatrix(rightHandSide);

    if (useSVD) {
      return new SingularValueDecomposition(leftHandSide).solve(rightHandSide);
    } else {
      return leftHandSide.isSquare() ? new LuDecomposition(leftHandSide).solve(rightHandSide) : new QrDecomposition(leftHandSide).solve(rightHandSide);
    }
  }

  var defaultOptions = {
    size: 1,
    value: 0
  };
  /**
   * Case when the entry is an array
   * @param data
   * @param options
   * @returns {Array}
   */

  function arrayCase(data, options) {
    var len = data.length;

    if (typeof options.size === 'number') {
      options.size = [options.size, options.size];
    }

    var cond = len + options.size[0] + options.size[1];
    var output;

    if (options.output) {
      if (options.output.length !== cond) {
        throw new RangeError('Wrong output size');
      }

      output = options.output;
    } else {
      output = new Array(cond);
    }

    var i;

    if (options.value === 'circular') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) {
          output[i] = data[(len - options.size[0] % len + i) % len];
        } else if (i < options.size[0] + len) {
          output[i] = data[i - options.size[0]];
        } else {
          output[i] = data[(i - options.size[0]) % len];
        }
      }
    } else if (options.value === 'replicate') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[0];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[len - 1];
      }
    } else if (options.value === 'symmetric') {
      if (options.size[0] > len || options.size[1] > len) {
        throw new RangeError('expanded value should not be bigger than the data length');
      }

      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[options.size[0] - 1 - i];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[2 * len + options.size[0] - i - 1];
      }
    } else {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = options.value;else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = options.value;
      }
    }

    return output;
  }
  /**
   * Case when the entry is a matrix
   * @param data
   * @param options
   * @returns {Array}
   */


  function matrixCase(data, options) {
    // var row = data.length;
    // var col = data[0].length;
    if (options.size[0] === undefined) {
      options.size = [options.size, options.size, options.size, options.size];
    }

    throw new Error('matrix not supported yet, sorry');
  }
  /**
   * Pads and array
   * @param {Array <number>} data
   * @param {object} options
   */


  function padArray(data, options) {
    options = Object.assign({}, defaultOptions, options);

    if (Array.isArray(data)) {
      if (Array.isArray(data[0])) return matrixCase(data, options);else return arrayCase(data, options);
    } else {
      throw new TypeError('data should be an array');
    }
  }

  var src$5 = padArray;

  /**
   * Factorial of a number
   * @ignore
   * @param n
   * @return {number}
   */

  function factorial(n) {
    let r = 1;

    while (n > 0) r *= n--;

    return r;
  }

  const defaultOptions$1 = {
    windowSize: 5,
    derivative: 1,
    polynomial: 2,
    pad: 'none',
    padValue: 'replicate'
  };
  /**
   * Savitzky-Golay filter
   * @param {Array <number>} data
   * @param {number} h
   * @param {Object} options
   * @returns {Array}
   */

  function savitzkyGolay(data, h, options) {
    options = Object.assign({}, defaultOptions$1, options);

    if (options.windowSize % 2 === 0 || options.windowSize < 5 || !Number.isInteger(options.windowSize)) {
      throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
    }

    if (options.derivative < 0 || !Number.isInteger(options.derivative)) {
      throw new RangeError('Derivative should be a positive integer');
    }

    if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) {
      throw new RangeError('Polynomial should be a positive integer');
    }

    let C, norm;
    let step = Math.floor(options.windowSize / 2);

    if (options.pad === 'pre') {
      data = src$5(data, {
        size: step,
        value: options.padValue
      });
    }

    let ans = new Array(data.length - 2 * step);

    if (options.windowSize === 5 && options.polynomial === 2 && (options.derivative === 1 || options.derivative === 2)) {
      if (options.derivative === 1) {
        C = [-2, -1, 0, 1, 2];
        norm = 10;
      } else {
        C = [2, -1, -2, -1, 2];
        norm = 7;
      }
    } else {
      let J = Matrix.ones(options.windowSize, options.polynomial + 1);
      let inic = -(options.windowSize - 1) / 2;

      for (let i = 0; i < J.rows; i++) {
        for (let j = 0; j < J.columns; j++) {
          if (inic + 1 !== 0 || j !== 0) J.set(i, j, Math.pow(inic + i, j));
        }
      }

      let Jtranspose = new MatrixTransposeView(J);
      let Jinv = inverse(Jtranspose.mmul(J));
      C = Jinv.mmul(Jtranspose);
      C = C.getRow(options.derivative);
      norm = 1 / factorial(options.derivative);
    }

    let det = norm * Math.pow(h, options.derivative);

    for (let k = step; k < data.length - step; k++) {
      let d = 0;

      for (let l = 0; l < C.length; l++) d += C[l] * data[l + k - step] / det;

      ans[k - step] = d;
    }

    if (options.pad === 'post') {
      ans = src$5(ans, {
        size: step,
        value: options.padValue
      });
    }

    return ans;
  }

  const toString$6 = Object.prototype.toString;

  function isAnyArray$6(object) {
    return toString$6.call(object).endsWith('Array]');
  }

  var src$6 = isAnyArray$6;

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, basedir, module) {
  	return module = {
  	  path: basedir,
  	  exports: {},
  	  require: function (path, base) {
        return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
      }
  	}, fn(module, module.exports), module.exports;
  }

  function commonjsRequire () {
  	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
  }

  var medianQuickselect_min = createCommonjsModule(function (module) {
    (function () {
      function a(d) {
        for (var e = 0, f = d.length - 1, g = void 0, h = void 0, i = void 0, j = c(e, f); !0;) {
          if (f <= e) return d[j];
          if (f == e + 1) return d[e] > d[f] && b(d, e, f), d[j];

          for (g = c(e, f), d[g] > d[f] && b(d, g, f), d[e] > d[f] && b(d, e, f), d[g] > d[e] && b(d, g, e), b(d, g, e + 1), h = e + 1, i = f; !0;) {
            do h++; while (d[e] > d[h]);

            do i--; while (d[i] > d[e]);

            if (i < h) break;
            b(d, h, i);
          }

          b(d, e, i), i <= j && (e = h), i >= j && (f = i - 1);
        }
      }

      var b = function b(d, e, f) {
        var _ref;

        return _ref = [d[f], d[e]], d[e] = _ref[0], d[f] = _ref[1], _ref;
      },
          c = function c(d, e) {
        return ~~((d + e) / 2);
      };

       module.exports ? module.exports = a : window.median = a;
    })();
  });

  /**
   * Computes the median of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function median(input) {
    if (!src$6(input)) {
      throw new TypeError('input must be an array');
    }

    if (input.length === 0) {
      throw new TypeError('input must not be empty');
    }

    return medianQuickselect_min(input.slice());
  }

  /**

  /**
   * This function divide the first array by the second array or a constant value to each element of the first array
   * @param {Array<Number>} array1 - the array that will be rotated
   * @param {Array<Number>|Number} array2
   * @return {Array}
   */
  function xDivide(array1, array2) {
    let isConstant = false;
    let constant;

    if (Array.isArray(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] / constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] / array2[i];
      }
    }

    return array3;
  }

  var d3Array = createCommonjsModule(function (module, exports) {
    (function (global, factory) {
       factory(exports) ;
    })(commonjsGlobal, function (exports) {

      function ascending(a, b) {
        return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
      }

      function bisector(compare) {
        if (compare.length === 1) compare = ascendingComparator(compare);
        return {
          left: function (a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;

            while (lo < hi) {
              var mid = lo + hi >>> 1;
              if (compare(a[mid], x) < 0) lo = mid + 1;else hi = mid;
            }

            return lo;
          },
          right: function (a, x, lo, hi) {
            if (lo == null) lo = 0;
            if (hi == null) hi = a.length;

            while (lo < hi) {
              var mid = lo + hi >>> 1;
              if (compare(a[mid], x) > 0) hi = mid;else lo = mid + 1;
            }

            return lo;
          }
        };
      }

      function ascendingComparator(f) {
        return function (d, x) {
          return ascending(f(d), x);
        };
      }

      var ascendingBisect = bisector(ascending);
      var bisectRight = ascendingBisect.right;
      var bisectLeft = ascendingBisect.left;

      function descending(a, b) {
        return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
      }

      function number$1(x) {
        return x === null ? NaN : +x;
      }

      function variance(array, f) {
        var n = array.length,
            m = 0,
            a,
            d,
            s = 0,
            i = -1,
            j = 0;

        if (f == null) {
          while (++i < n) {
            if (!isNaN(a = number$1(array[i]))) {
              d = a - m;
              m += d / ++j;
              s += d * (a - m);
            }
          }
        } else {
          while (++i < n) {
            if (!isNaN(a = number$1(f(array[i], i, array)))) {
              d = a - m;
              m += d / ++j;
              s += d * (a - m);
            }
          }
        }

        if (j > 1) return s / (j - 1);
      }

      function deviation(array, f) {
        var v = variance(array, f);
        return v ? Math.sqrt(v) : v;
      }

      function extent(array, f) {
        var i = -1,
            n = array.length,
            a,
            b,
            c;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = c = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null) {
            if (a > b) a = b;
            if (c < b) c = b;
          }
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = c = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null) {
            if (a > b) a = b;
            if (c < b) c = b;
          }
        }

        return [a, c];
      }

      function constant(x) {
        return function () {
          return x;
        };
      }

      function identity(x) {
        return x;
      }

      function range(start, stop, step) {
        start = +start, stop = +stop, step = (n = arguments.length) < 2 ? (stop = start, start = 0, 1) : n < 3 ? 1 : +step;
        var i = -1,
            n = Math.max(0, Math.ceil((stop - start) / step)) | 0,
            range = new Array(n);

        while (++i < n) {
          range[i] = start + i * step;
        }

        return range;
      }

      var e10 = Math.sqrt(50);
      var e5 = Math.sqrt(10);
      var e2 = Math.sqrt(2);

      function ticks(start, stop, count) {
        var step = tickStep(start, stop, count);
        return range(Math.ceil(start / step) * step, Math.floor(stop / step) * step + step / 2, // inclusive
        step);
      }

      function tickStep(start, stop, count) {
        var step0 = Math.abs(stop - start) / Math.max(0, count),
            step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
            error = step0 / step1;
        if (error >= e10) step1 *= 10;else if (error >= e5) step1 *= 5;else if (error >= e2) step1 *= 2;
        return stop < start ? -step1 : step1;
      }

      function sturges(values) {
        return Math.ceil(Math.log(values.length) / Math.LN2) + 1;
      }

      function number(x) {
        return +x;
      }

      function histogram() {
        var value = identity,
            domain = extent,
            threshold = sturges;

        function histogram(data) {
          var i,
              n = data.length,
              x,
              values = new Array(n); // Coerce values to numbers.

          for (i = 0; i < n; ++i) {
            values[i] = +value(data[i], i, data);
          }

          var xz = domain(values),
              x0 = +xz[0],
              x1 = +xz[1],
              tz = threshold(values, x0, x1); // Convert number of thresholds into uniform thresholds.

          if (!Array.isArray(tz)) tz = ticks(x0, x1, +tz); // Coerce thresholds to numbers, ignoring any outside the domain.

          var m = tz.length;

          for (i = 0; i < m; ++i) tz[i] = +tz[i];

          while (tz[0] <= x0) tz.shift(), --m;

          while (tz[m - 1] >= x1) tz.pop(), --m;

          var bins = new Array(m + 1),
              bin; // Initialize bins.

          for (i = 0; i <= m; ++i) {
            bin = bins[i] = [];
            bin.x0 = i > 0 ? tz[i - 1] : x0;
            bin.x1 = i < m ? tz[i] : x1;
          } // Assign data to bins by value, ignoring any outside the domain.


          for (i = 0; i < n; ++i) {
            x = values[i];

            if (x0 <= x && x <= x1) {
              bins[bisectRight(tz, x, 0, m)].push(data[i]);
            }
          }

          return bins;
        }

        histogram.value = function (_) {
          return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), histogram) : value;
        };

        histogram.domain = function (_) {
          return arguments.length ? (domain = typeof _ === "function" ? _ : constant([+_[0], +_[1]]), histogram) : domain;
        };

        histogram.thresholds = function (_) {
          if (!arguments.length) return threshold;
          threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(Array.prototype.map.call(_, number)) : constant(+_);
          return histogram;
        };

        return histogram;
      }

      function quantile(array, p, f) {
        if (f == null) f = number$1;
        if (!(n = array.length)) return;
        if ((p = +p) <= 0 || n < 2) return +f(array[0], 0, array);
        if (p >= 1) return +f(array[n - 1], n - 1, array);
        var n,
            h = (n - 1) * p,
            i = Math.floor(h),
            a = +f(array[i], i, array),
            b = +f(array[i + 1], i + 1, array);
        return a + (b - a) * (h - i);
      }

      function freedmanDiaconis(values, min, max) {
        values.sort(ascending);
        return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
      }

      function scott(values, min, max) {
        return Math.ceil((max - min) / (3.5 * deviation(values) * Math.pow(values.length, -1 / 3)));
      }

      function max(array, f) {
        var i = -1,
            n = array.length,
            a,
            b;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null && b > a) a = b;
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null && b > a) a = b;
        }

        return a;
      }

      function mean(array, f) {
        var s = 0,
            n = array.length,
            a,
            i = -1,
            j = n;

        if (f == null) {
          while (++i < n) if (!isNaN(a = number$1(array[i]))) s += a;else --j;
        } else {
          while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) s += a;else --j;
        }

        if (j) return s / j;
      }

      function median(array, f) {
        var numbers = [],
            n = array.length,
            a,
            i = -1;

        if (f == null) {
          while (++i < n) if (!isNaN(a = number$1(array[i]))) numbers.push(a);
        } else {
          while (++i < n) if (!isNaN(a = number$1(f(array[i], i, array)))) numbers.push(a);
        }

        return quantile(numbers.sort(ascending), 0.5);
      }

      function merge(arrays) {
        var n = arrays.length,
            m,
            i = -1,
            j = 0,
            merged,
            array;

        while (++i < n) j += arrays[i].length;

        merged = new Array(j);

        while (--n >= 0) {
          array = arrays[n];
          m = array.length;

          while (--m >= 0) {
            merged[--j] = array[m];
          }
        }

        return merged;
      }

      function min(array, f) {
        var i = -1,
            n = array.length,
            a,
            b;

        if (f == null) {
          while (++i < n) if ((b = array[i]) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = array[i]) != null && a > b) a = b;
        } else {
          while (++i < n) if ((b = f(array[i], i, array)) != null && b >= b) {
            a = b;
            break;
          }

          while (++i < n) if ((b = f(array[i], i, array)) != null && a > b) a = b;
        }

        return a;
      }

      function pairs(array) {
        var i = 0,
            n = array.length - 1,
            p = array[0],
            pairs = new Array(n < 0 ? 0 : n);

        while (i < n) pairs[i] = [p, p = array[++i]];

        return pairs;
      }

      function permute(array, indexes) {
        var i = indexes.length,
            permutes = new Array(i);

        while (i--) permutes[i] = array[indexes[i]];

        return permutes;
      }

      function scan(array, compare) {
        if (!(n = array.length)) return;
        var i = 0,
            n,
            j = 0,
            xi,
            xj = array[j];
        if (!compare) compare = ascending;

        while (++i < n) if (compare(xi = array[i], xj) < 0 || compare(xj, xj) !== 0) xj = xi, j = i;

        if (compare(xj, xj) === 0) return j;
      }

      function shuffle(array, i0, i1) {
        var m = (i1 == null ? array.length : i1) - (i0 = i0 == null ? 0 : +i0),
            t,
            i;

        while (m) {
          i = Math.random() * m-- | 0;
          t = array[m + i0];
          array[m + i0] = array[i + i0];
          array[i + i0] = t;
        }

        return array;
      }

      function sum(array, f) {
        var s = 0,
            n = array.length,
            a,
            i = -1;

        if (f == null) {
          while (++i < n) if (a = +array[i]) s += a; // Note: zero and null are equivalent.

        } else {
          while (++i < n) if (a = +f(array[i], i, array)) s += a;
        }

        return s;
      }

      function transpose(matrix) {
        if (!(n = matrix.length)) return [];

        for (var i = -1, m = min(matrix, length), transpose = new Array(m); ++i < m;) {
          for (var j = -1, n, row = transpose[i] = new Array(n); ++j < n;) {
            row[j] = matrix[j][i];
          }
        }

        return transpose;
      }

      function length(d) {
        return d.length;
      }

      function zip() {
        return transpose(arguments);
      }

      var version = "0.7.1";
      exports.version = version;
      exports.bisect = bisectRight;
      exports.bisectRight = bisectRight;
      exports.bisectLeft = bisectLeft;
      exports.ascending = ascending;
      exports.bisector = bisector;
      exports.descending = descending;
      exports.deviation = deviation;
      exports.extent = extent;
      exports.histogram = histogram;
      exports.thresholdFreedmanDiaconis = freedmanDiaconis;
      exports.thresholdScott = scott;
      exports.thresholdSturges = sturges;
      exports.max = max;
      exports.mean = mean;
      exports.median = median;
      exports.merge = merge;
      exports.min = min;
      exports.pairs = pairs;
      exports.permute = permute;
      exports.quantile = quantile;
      exports.range = range;
      exports.scan = scan;
      exports.shuffle = shuffle;
      exports.sum = sum;
      exports.ticks = ticks;
      exports.tickStep = tickStep;
      exports.transpose = transpose;
      exports.variance = variance;
      exports.zip = zip;
    });
  });

  /**
   * This function xSubtract the first array by the second array or a constant value from each element of the first array
   * @param {Array} array1 - the array that will be rotated
   * @param {Array|Number} array2
   * @return {Array}
   */
  function xSubtract(array1, array2) {
    let isConstant = false;
    let constant;

    if (Array.isArray(array2)) {
      if (array1.length !== array2.length) {
        throw new Error('sub: size of array1 and array2 must be identical');
      }
    } else {
      isConstant = true;
      constant = Number(array2);
    }

    let array3 = new Array(array1.length);

    if (isConstant) {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] - constant;
      }
    } else {
      for (let i = 0; i < array1.length; i++) {
        array3[i] = array1[i] - array2[i];
      }
    }

    return array3;
  }

  var array = createCommonjsModule(function (module, exports) {

    function compareNumbers(a, b) {
      return a - b;
    }
    /**
     * Computes the sum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.sum = function sum(values) {
      var sum = 0;

      for (var i = 0; i < values.length; i++) {
        sum += values[i];
      }

      return sum;
    };
    /**
     * Computes the maximum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.max = function max(values) {
      var max = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] > max) max = values[i];
      }

      return max;
    };
    /**
     * Computes the minimum of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.min = function min(values) {
      var min = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] < min) min = values[i];
      }

      return min;
    };
    /**
     * Computes the min and max of the given values
     * @param {Array} values
     * @returns {{min: number, max: number}}
     */


    exports.minMax = function minMax(values) {
      var min = values[0];
      var max = values[0];
      var l = values.length;

      for (var i = 1; i < l; i++) {
        if (values[i] < min) min = values[i];
        if (values[i] > max) max = values[i];
      }

      return {
        min: min,
        max: max
      };
    };
    /**
     * Computes the arithmetic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.arithmeticMean = function arithmeticMean(values) {
      var sum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        sum += values[i];
      }

      return sum / l;
    };
    /**
     * {@link arithmeticMean}
     */


    exports.mean = exports.arithmeticMean;
    /**
     * Computes the geometric mean of the given values
     * @param {Array} values
     * @returns {number}
     */

    exports.geometricMean = function geometricMean(values) {
      var mul = 1;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        mul *= values[i];
      }

      return Math.pow(mul, 1 / l);
    };
    /**
     * Computes the mean of the log of the given values
     * If the return value is exponentiated, it gives the same result as the
     * geometric mean.
     * @param {Array} values
     * @returns {number}
     */


    exports.logMean = function logMean(values) {
      var lnsum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        lnsum += Math.log(values[i]);
      }

      return lnsum / l;
    };
    /**
     * Computes the weighted grand mean for a list of means and sample sizes
     * @param {Array} means - Mean values for each set of samples
     * @param {Array} samples - Number of original values for each set of samples
     * @returns {number}
     */


    exports.grandMean = function grandMean(means, samples) {
      var sum = 0;
      var n = 0;
      var l = means.length;

      for (var i = 0; i < l; i++) {
        sum += samples[i] * means[i];
        n += samples[i];
      }

      return sum / n;
    };
    /**
     * Computes the truncated mean of the given values using a given percentage
     * @param {Array} values
     * @param {number} percent - The percentage of values to keep (range: [0,1])
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */


    exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
      if (alreadySorted === undefined) alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var l = values.length;
      var k = Math.floor(l * percent);
      var sum = 0;

      for (var i = k; i < l - k; i++) {
        sum += values[i];
      }

      return sum / (l - 2 * k);
    };
    /**
     * Computes the harmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.harmonicMean = function harmonicMean(values) {
      var sum = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        if (values[i] === 0) {
          throw new RangeError('value at index ' + i + 'is zero');
        }

        sum += 1 / values[i];
      }

      return l / sum;
    };
    /**
     * Computes the contraharmonic mean of the given values
     * @param {Array} values
     * @returns {number}
     */


    exports.contraHarmonicMean = function contraHarmonicMean(values) {
      var r1 = 0;
      var r2 = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        r1 += values[i] * values[i];
        r2 += values[i];
      }

      if (r2 < 0) {
        throw new RangeError('sum of values is negative');
      }

      return r1 / r2;
    };
    /**
     * Computes the median of the given values
     * @param {Array} values
     * @param {boolean} [alreadySorted=false]
     * @returns {number}
     */


    exports.median = function median(values, alreadySorted) {
      if (alreadySorted === undefined) alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var l = values.length;
      var half = Math.floor(l / 2);

      if (l % 2 === 0) {
        return (values[half - 1] + values[half]) * 0.5;
      } else {
        return values[half];
      }
    };
    /**
     * Computes the variance of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */


    exports.variance = function variance(values, unbiased) {
      if (unbiased === undefined) unbiased = true;
      var theMean = exports.mean(values);
      var theVariance = 0;
      var l = values.length;

      for (var i = 0; i < l; i++) {
        var x = values[i] - theMean;
        theVariance += x * x;
      }

      if (unbiased) {
        return theVariance / (l - 1);
      } else {
        return theVariance / l;
      }
    };
    /**
     * Computes the standard deviation of the given values
     * @param {Array} values
     * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
     * @returns {number}
     */


    exports.standardDeviation = function standardDeviation(values, unbiased) {
      return Math.sqrt(exports.variance(values, unbiased));
    };

    exports.standardError = function standardError(values) {
      return exports.standardDeviation(values) / Math.sqrt(values.length);
    };
    /**
     * IEEE Transactions on biomedical engineering, vol. 52, no. 1, january 2005, p. 76-
     * Calculate the standard deviation via the Median of the absolute deviation
     *  The formula for the standard deviation only holds for Gaussian random variables.
     * @returns {{mean: number, stdev: number}}
     */


    exports.robustMeanAndStdev = function robustMeanAndStdev(y) {
      var mean = 0,
          stdev = 0;
      var length = y.length,
          i = 0;

      for (i = 0; i < length; i++) {
        mean += y[i];
      }

      mean /= length;
      var averageDeviations = new Array(length);

      for (i = 0; i < length; i++) averageDeviations[i] = Math.abs(y[i] - mean);

      averageDeviations.sort(compareNumbers);

      if (length % 2 === 1) {
        stdev = averageDeviations[(length - 1) / 2] / 0.6745;
      } else {
        stdev = 0.5 * (averageDeviations[length / 2] + averageDeviations[length / 2 - 1]) / 0.6745;
      }

      return {
        mean: mean,
        stdev: stdev
      };
    };

    exports.quartiles = function quartiles(values, alreadySorted) {
      if (typeof alreadySorted === 'undefined') alreadySorted = false;

      if (!alreadySorted) {
        values = [].concat(values).sort(compareNumbers);
      }

      var quart = values.length / 4;
      var q1 = values[Math.ceil(quart) - 1];
      var q2 = exports.median(values, true);
      var q3 = values[Math.ceil(quart * 3) - 1];
      return {
        q1: q1,
        q2: q2,
        q3: q3
      };
    };

    exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
      return Math.sqrt(exports.pooledVariance(samples, unbiased));
    };

    exports.pooledVariance = function pooledVariance(samples, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var sum = 0;
      var length = 0,
          l = samples.length;

      for (var i = 0; i < l; i++) {
        var values = samples[i];
        var vari = exports.variance(values);
        sum += (values.length - 1) * vari;
        if (unbiased) length += values.length - 1;else length += values.length;
      }

      return sum / length;
    };

    exports.mode = function mode(values) {
      var l = values.length,
          itemCount = new Array(l),
          i;

      for (i = 0; i < l; i++) {
        itemCount[i] = 0;
      }

      var itemArray = new Array(l);
      var count = 0;

      for (i = 0; i < l; i++) {
        var index = itemArray.indexOf(values[i]);
        if (index >= 0) itemCount[index]++;else {
          itemArray[count] = values[i];
          itemCount[count] = 1;
          count++;
        }
      }

      var maxValue = 0,
          maxIndex = 0;

      for (i = 0; i < count; i++) {
        if (itemCount[i] > maxValue) {
          maxValue = itemCount[i];
          maxIndex = i;
        }
      }

      return itemArray[maxIndex];
    };

    exports.covariance = function covariance(vector1, vector2, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var mean1 = exports.mean(vector1);
      var mean2 = exports.mean(vector2);
      if (vector1.length !== vector2.length) throw 'Vectors do not have the same dimensions';
      var cov = 0,
          l = vector1.length;

      for (var i = 0; i < l; i++) {
        var x = vector1[i] - mean1;
        var y = vector2[i] - mean2;
        cov += x * y;
      }

      if (unbiased) return cov / (l - 1);else return cov / l;
    };

    exports.skewness = function skewness(values, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var theMean = exports.mean(values);
      var s2 = 0,
          s3 = 0,
          l = values.length;

      for (var i = 0; i < l; i++) {
        var dev = values[i] - theMean;
        s2 += dev * dev;
        s3 += dev * dev * dev;
      }

      var m2 = s2 / l;
      var m3 = s3 / l;
      var g = m3 / Math.pow(m2, 3 / 2.0);

      if (unbiased) {
        var a = Math.sqrt(l * (l - 1));
        var b = l - 2;
        return a / b * g;
      } else {
        return g;
      }
    };

    exports.kurtosis = function kurtosis(values, unbiased) {
      if (typeof unbiased === 'undefined') unbiased = true;
      var theMean = exports.mean(values);
      var n = values.length,
          s2 = 0,
          s4 = 0;

      for (var i = 0; i < n; i++) {
        var dev = values[i] - theMean;
        s2 += dev * dev;
        s4 += dev * dev * dev * dev;
      }

      var m2 = s2 / n;
      var m4 = s4 / n;

      if (unbiased) {
        var v = s2 / (n - 1);
        var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
        var b = s4 / (v * v);
        var c = (n - 1) * (n - 1) / ((n - 2) * (n - 3));
        return a * b - 3 * c;
      } else {
        return m4 / (m2 * m2) - 3;
      }
    };

    exports.entropy = function entropy(values, eps) {
      if (typeof eps === 'undefined') eps = 0;
      var sum = 0,
          l = values.length;

      for (var i = 0; i < l; i++) sum += values[i] * Math.log(values[i] + eps);

      return -sum;
    };

    exports.weightedMean = function weightedMean(values, weights) {
      var sum = 0,
          l = values.length;

      for (var i = 0; i < l; i++) sum += values[i] * weights[i];

      return sum;
    };

    exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
      return Math.sqrt(exports.weightedVariance(values, weights));
    };

    exports.weightedVariance = function weightedVariance(values, weights) {
      var theMean = exports.weightedMean(values, weights);
      var vari = 0,
          l = values.length;
      var a = 0,
          b = 0;

      for (var i = 0; i < l; i++) {
        var z = values[i] - theMean;
        var w = weights[i];
        vari += w * (z * z);
        b += w;
        a += w * w;
      }

      return vari * (b / (b * b - a));
    };

    exports.center = function center(values, inPlace) {
      if (typeof inPlace === 'undefined') inPlace = false;
      var result = values;
      if (!inPlace) result = [].concat(values);
      var theMean = exports.mean(result),
          l = result.length;

      for (var i = 0; i < l; i++) result[i] -= theMean;
    };

    exports.standardize = function standardize(values, standardDev, inPlace) {
      if (typeof standardDev === 'undefined') standardDev = exports.standardDeviation(values);
      if (typeof inPlace === 'undefined') inPlace = false;
      var l = values.length;
      var result = inPlace ? values : new Array(l);

      for (var i = 0; i < l; i++) result[i] = values[i] / standardDev;

      return result;
    };

    exports.cumulativeSum = function cumulativeSum(array) {
      var l = array.length;
      var result = new Array(l);
      result[0] = array[0];

      for (var i = 1; i < l; i++) result[i] = result[i - 1] + array[i];

      return result;
    };
  });

  /**
   *
   * @private
   * @param {object} spectrum
   * @param {object} [options={}]
   * @param {number} [options.from=spectrum.x[0]]
   * @param {number} [options.to=spectrum.x[spectrum.x.length-1]]
   * @param {number} [options.numberOfPoints]
   * @param {Array} [options.filters=[]] Array of object containing 'name' (centerMean, divideSD, normalize, rescale) and 'options'
   * @param {Array} [options.exclusions=[]]
   * @returns {DataXY}
   */

  function getNormalizedData(spectrum, options = {}) {
    let data = {
      x: spectrum.variables.x.data,
      y: spectrum.variables.y.data
    };
    let {
      from = data.x[0],
      to = data.x[data.x.length - 1],
      numberOfPoints,
      filters = [],
      exclusions = [],
      processing = ''
    } = options;
    let {
      x,
      y
    } = filterX(data, {
      from,
      to
    });

    switch (processing) {
      case 'firstDerivative':
        if (options.processing) {
          y = savitzkyGolay(y, 1, {
            derivative: 1,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;

      case 'secondDerivative':
        if (options.processing) {
          y = savitzkyGolay(y, 1, {
            derivative: 2,
            polynomial: 2,
            windowSize: 5
          });
          x = x.slice(2, x.length - 2);
        }

        break;
    }

    for (let filter of filters) {
      let filterOptions = filter.options || {};

      switch (filter.name.toLowerCase()) {
        case 'centermean':
          {
            let mean = array.mean(y);
            y = xSubtract(y, mean);
            break;
          }

        case 'dividebysd':
          {
            let std = array.standardDeviation(y);
            y = xDivide(y, std);
            break;
          }

        case 'normalize':
          {
            // should be an integration in fact
            y = norm(y, {
              sumValue: filterOptions.value ? Number(filterOptions.value) : 1,
              algorithm: 'absolute'
            });
            break;
          }

        case 'rescale':
          {
            y = rescale(y, {
              min: filterOptions.min ? Number(filter.options.min) : 0,
              max: filterOptions.max ? Number(filter.options.max) : 1
            });
            break;
          }

        case '':
        case undefined:
          break;

        default:
          throw new Error(`Unknown process kind: ${process.kind}`);
      }
    }

    if (!numberOfPoints) {
      return filterX({
        x,
        y
      }, {
        from,
        to,
        exclusions
      });
    }

    return equallySpaced({
      x,
      y
    }, {
      from,
      to,
      numberOfPoints,
      exclusions
    });
  }

  /**
   * Class allowing to store and manipulate an analysis.
   * An analysis may contain one or more spectra that are identified
   * by a 'flavor'
   * @class Analysis
   * @param {object} [options={}]
   * @param {string} [options.id=randomString] unique identifier
   * @param {string} [options.label=options.id] human redeable label
   */

  class Analysis {
    constructor(options = {}) {
      this.id = options.id || Math.random().toString(36).substring(2, 10);
      this.label = options.label || this.id;
      this.spectra = [];
    }
    /**
     * Set a spectrum for a specific flavor
     * @param {object} [variables]
     * @param {object} [variables.x]
     * @param {array} [variables.x.data]
     * @param {array} [variables.x.units='x']
     * @param {array} [variables.x.label='x']
     * @param {object} [variables.y]
     * @param {array} [variables.y.data]
     * @param {array} [variables.y.units='y']
     * @param {array} [variables.y.label='y']
     * @param {object} [options={}]
     * @param {string} [options.dataType='']
     * @param {string} [options.title='']
     * @param {object} [options.flavor={}]
     *
     */


    pushSpectrum(variables, options = {}) {
      this.spectra.push(standardizeData(variables, options));
    }
    /**
     * Retrieve a Spectrum based on a flavor
     * @param {object} [selector={}]
     * @param {string} [selector.index]
     * @param {string} [selector.flavor]
     * @returns {Spectrum}
     */


    getSpectrum(selector = {}) {
      let spectra = this.getSpectra(selector);
      return spectra ? spectra[0] : undefined;
    }
    /**
     * Retrieve a Spectrum based on a flavor
     * @param {object} [selector={}]
     * @param {string} [selector.index]
     * @param {string} [selector.flavor]
     * @returns {Spectrum}
     */


    getSpectra(selector = {}) {
      const {
        index,
        flavor
      } = selector;

      if (index !== undefined) {
        return this.spectra[index] ? [this.spectra[index]] : undefined;
      }

      if (flavor === undefined || flavor === '') return this.spectra;
      return this.spectra.filter(spectrum => spectrum.flavor === flavor);
    }
    /**
     * Return the data object for a specific flavor with possibly some
     * normalization options
     * @param {object} [options={}]
     * @param {object} [options.selector]
     * @param {string} [options.selector.index]
     * @param {string} [options.selector.flavor]
     * @param {object} [options.normalization]
     *
     */


    getNormalizedData(options = {}) {
      const {
        normalization,
        selector
      } = options;
      const spectrum = this.getSpectrum(selector);
      if (!spectrum) return undefined;
      return getNormalizedData(spectrum, normalization);
    }

    getXLabel(selector) {
      return this.getSpectrum(selector).variables.x.label;
    }

    getYLabel(selector) {
      return this.getSpectrum(selector).variables.y.label;
    }

  }
  /**
   * Internal function that ensure the order of x / y array
   * @param {DataXY} [variables]
   * @param {object} [options={}]
   * @return {Spectrum}
   */

  function standardizeData(variables, options = {}) {
    let {
      meta = {},
      dataType = '',
      title = ''
    } = options;
    let xVariable = variables.x;
    let yVariable = variables.y;

    if (!xVariable || !yVariable) {
      throw Error('A spectrum must contain at least x and y variables');
    }

    if (!isAnyArray(xVariable.data) || !isAnyArray(yVariable.data)) {
      throw Error('x and y variables must contain an array data');
    }

    let x = xVariable.data;
    let reverse = x && x.length > 1 && x[0] > x[x.length - 1];

    for (let key in variables) {
      let variable = variables[key];
      if (reverse) variable.data = variable.data.reverse();
      variable.label = variable.label || key;
      variable.units = variable.units || variable.label.replace(/^.*[([](.*)[)\]].*$/, '$1');
    }

    return {
      variables,
      title,
      dataType,
      meta,
      flavor: `${yVariable.units} vs ${xVariable.units}`
    };
  }

  const GC_MS_FIELDS = ['TIC', '.RIC', 'SCANNUMBER'];
  function complexChromatogram(result) {
    let spectra = result.spectra;
    let length = spectra.length;
    let chromatogram = {
      times: new Array(length),
      series: {
        ms: {
          dimension: 2,
          data: new Array(length)
        }
      }
    };
    let existingGCMSFields = [];

    for (let i = 0; i < GC_MS_FIELDS.length; i++) {
      let label = convertMSFieldToLabel(GC_MS_FIELDS[i]);

      if (spectra[0][label]) {
        existingGCMSFields.push(label);
        chromatogram.series[label] = {
          dimension: 1,
          data: new Array(length)
        };
      }
    }

    for (let i = 0; i < length; i++) {
      let spectrum = spectra[i];
      chromatogram.times[i] = spectrum.pageValue;

      for (let j = 0; j < existingGCMSFields.length; j++) {
        chromatogram.series[existingGCMSFields[j]].data[i] = parseFloat(spectrum[existingGCMSFields[j]]);
      }

      if (spectrum.data) {
        chromatogram.series.ms.data[i] = [spectrum.data.x, spectrum.data.y];
      }
    }

    result.chromatogram = chromatogram;
  }
  function isMSField(canonicDataLabel) {
    return GC_MS_FIELDS.indexOf(canonicDataLabel) !== -1;
  }
  function convertMSFieldToLabel(value) {
    return value.toLowerCase().replace(/[^a-z0-9]/g, '');
  }

  function convertToFloatArray(stringArray) {
    let floatArray = [];

    for (let i = 0; i < stringArray.length; i++) {
      floatArray.push(parseFloat(stringArray[i]));
    }

    return floatArray;
  }

  function fastParseXYData(spectrum, value) {
    // TODO need to deal with result
    //  console.log(value);
    // we check if deltaX is defined otherwise we calculate it
    let yFactor = spectrum.yFactor;
    let deltaX = spectrum.deltaX;
    spectrum.isXYdata = true;
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData;
    let currentX = spectrum.firstX;
    let currentY = spectrum.firstY; // we skip the first line
    //

    let endLine = false;
    let ascii;
    let i = 0;

    for (; i < value.length; i++) {
      ascii = value.charCodeAt(i);

      if (ascii === 13 || ascii === 10) {
        endLine = true;
      } else {
        if (endLine) break;
      }
    } // we proceed taking the i after the first line


    let newLine = true;
    let isDifference = false;
    let isLastDifference = false;
    let lastDifference = 0;
    let isDuplicate = false;
    let inComment = false;
    let currentValue = 0; // can be a difference or a duplicate

    let lastValue = 0; // must be the real last value

    let isNegative = false;
    let inValue = false;
    let skipFirstValue = false;
    let decimalPosition = 0;

    for (; i <= value.length; i++) {
      if (i === value.length) ascii = 13;else ascii = value.charCodeAt(i);

      if (inComment) {
        // we should ignore the text if we are after $$
        if (ascii === 13 || ascii === 10) {
          newLine = true;
          inComment = false;
        }
      } else {
        // when is it a new value ?
        // when it is not a digit, . or comma
        // it is a number that is either new or we continue
        if (ascii <= 57 && ascii >= 48) {
          // a number
          inValue = true;

          if (decimalPosition > 0) {
            currentValue += (ascii - 48) / Math.pow(10, decimalPosition++);
          } else {
            currentValue *= 10;
            currentValue += ascii - 48;
          }
        } else if (ascii === 44 || ascii === 46) {
          // a "," or "."
          inValue = true;
          decimalPosition++;
        } else {
          if (inValue) {
            // need to process the previous value
            if (newLine) {
              newLine = false; // we don't check the X value
              // console.log("NEW LINE",isDifference, lastDifference);
              // if new line and lastDifference, the first value is just a check !
              // that we don't check ...

              if (isLastDifference) skipFirstValue = true;
            } else {
              // need to deal with duplicate and differences
              if (skipFirstValue) {
                skipFirstValue = false;
              } else {
                if (isDifference) {
                  lastDifference = isNegative ? 0 - currentValue : currentValue;
                  isLastDifference = true;
                  isDifference = false;
                } else if (!isDuplicate) {
                  lastValue = isNegative ? 0 - currentValue : currentValue;
                }

                let duplicate = isDuplicate ? currentValue - 1 : 1;

                for (let j = 0; j < duplicate; j++) {
                  if (isLastDifference) {
                    currentY += lastDifference;
                  } else {
                    currentY = lastValue;
                  }

                  currentData.x.push(currentX);
                  currentData.y.push(currentY * yFactor);
                  currentX += deltaX;
                }
              }
            }

            isNegative = false;
            currentValue = 0;
            decimalPosition = 0;
            inValue = false;
            isDuplicate = false;
          } // positive SQZ digits @ A B C D E F G H I (ascii 64-73)


          if (ascii < 74 && ascii > 63) {
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 64;
          } else if (ascii > 96 && ascii < 106) {
            // negative SQZ digits a b c d e f g h i (ascii 97-105)
            inValue = true;
            isLastDifference = false;
            currentValue = ascii - 96;
            isNegative = true;
          } else if (ascii === 115) {
            // DUP digits S T U V W X Y Z s (ascii 83-90, 115)
            inValue = true;
            isDuplicate = true;
            currentValue = 9;
          } else if (ascii > 82 && ascii < 91) {
            inValue = true;
            isDuplicate = true;
            currentValue = ascii - 82;
          } else if (ascii > 73 && ascii < 83) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 73;
          } else if (ascii > 105 && ascii < 115) {
            // negative DIF digits j k l m n o p q r (ascii 106-114)
            inValue = true;
            isDifference = true;
            currentValue = ascii - 105;
            isNegative = true;
          } else if (ascii === 36 && value.charCodeAt(i + 1) === 36) {
            // $ sign, we need to check the next one
            inValue = true;
            inComment = true;
          } else if (ascii === 37) {
            // positive DIF digits % J K L M N O P Q R (ascii 37, 74-82)
            inValue = true;
            isDifference = true;
            currentValue = 0;
            isNegative = false;
          } else if (ascii === 45) {
            // a "-"
            // check if after there is a number, decimal or comma
            let ascii2 = value.charCodeAt(i + 1);

            if (ascii2 >= 48 && ascii2 <= 57 || ascii2 === 44 || ascii2 === 46) {
              inValue = true;
              if (!newLine) isLastDifference = false;
              isNegative = true;
            }
          } else if (ascii === 13 || ascii === 10) {
            newLine = true;
            inComment = false;
          } // and now analyse the details ... space or tabulation
          // if "+" we just don't care

        }
      }
    }
  }

  const removeCommentRegExp = /\$\$.*/;
  const peakTableSplitRegExp = /[,\t ]+/;
  function parsePeakTable(spectrum, value, result) {
    spectrum.isPeaktable = true;

    if (!spectrum.variables || Object.keys(spectrum.variables) === 2) {
      parseXY(spectrum, value, result);
    } else {
      parseXYZ(spectrum, value, result);
    } // we will add the data in the variables


    if (spectrum.variables) {
      for (let key in spectrum.variables) {
        spectrum.variables[key].data = spectrum.data[key];
      }
    }
  }

  function parseXY(spectrum, value, result) {
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData; // counts for around 20% of the time

    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % 2 === 0) {
        for (let j = 0; j < values.length; j = j + 2) {
          // takes around 40% of the time to add and parse the 2 values nearly exclusively because of parseFloat
          currentData.x.push(parseFloat(values[j]) * spectrum.xFactor);
          currentData.y.push(parseFloat(values[j + 1]) * spectrum.yFactor);
        }
      } else {
        result.logs.push(`Format error: ${values}`);
      }
    }
  }

  function parseXYZ(spectrum, value, result) {
    let currentData = {};
    let variables = Object.keys(spectrum.variables);
    let numberOfVariables = variables.length;
    variables.forEach(variable => currentData[variable] = []);
    spectrum.data = currentData; // counts for around 20% of the time

    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      let values = lines[i].trim().replace(removeCommentRegExp, '').split(peakTableSplitRegExp);

      if (values.length % numberOfVariables === 0) {
        for (let j = 0; j < values.length; j++) {
          // todo should try to find a xFactor (y, ...)
          currentData[variables[j % numberOfVariables]].push(parseFloat(values[j]));
        }
      } else {
        result.logs.push(`Format error: ${values}`);
      }
    }
  }

  function parseXYA(spectrum, value) {
    let removeSymbolRegExp = /(\(+|\)+|<+|>+|\s+)/g;
    spectrum.isXYAdata = true;
    let values;
    let currentData = {
      x: [],
      y: []
    };
    spectrum.data = currentData;
    let lines = value.split(/,? *,?[;\r\n]+ */);

    for (let i = 1; i < lines.length; i++) {
      values = lines[i].trim().replace(removeSymbolRegExp, '').split(',');
      currentData.x.push(parseFloat(values[0]));
      currentData.y.push(parseFloat(values[1]));
    }
  }

  function convertTo3DZ(spectra) {
    let minZ = spectra[0].data.y[0];
    let maxZ = minZ;
    let ySize = spectra.length;
    let xSize = spectra[0].data.x.length;
    let z = new Array(ySize);

    for (let i = 0; i < ySize; i++) {
      z[i] = spectra[i].data.y;

      for (let j = 0; j < xSize; j++) {
        let value = z[i][j];
        if (value < minZ) minZ = value;
        if (value > maxZ) maxZ = value;
      }
    }

    const firstX = spectra[0].data.x[0];
    const lastX = spectra[0].data.x[spectra[0].data.x.length - 1]; // has to be -2 because it is a 1D array [x,y,x,y,...]

    const firstY = spectra[0].pageValue;
    const lastY = spectra[ySize - 1].pageValue; // Because the min / max value are the only information about the matrix if we invert
    // min and max we need to invert the array

    if (firstX > lastX) {
      for (let spectrum of z) {
        spectrum.reverse();
      }
    }

    if (firstY > lastY) {
      z.reverse();
    }

    return {
      z: z,
      minX: Math.min(firstX, lastX),
      maxX: Math.max(firstX, lastX),
      minY: Math.min(firstY, lastY),
      maxY: Math.max(firstY, lastY),
      minZ: minZ,
      maxZ: maxZ,
      noise: median(z[0].map(Math.abs))
    };
  }

  function generateContourLines(zData, options) {
    let noise = zData.noise;
    let z = zData.z;
    let povarHeight0, povarHeight1, povarHeight2, povarHeight3;
    let isOver0, isOver1, isOver2, isOver3;
    let nbSubSpectra = z.length;
    let nbPovars = z[0].length;
    let pAx, pAy, pBx, pBy;
    let x0 = zData.minX;
    let xN = zData.maxX;
    let dx = (xN - x0) / (nbPovars - 1);
    let y0 = zData.minY;
    let yN = zData.maxY;
    let dy = (yN - y0) / (nbSubSpectra - 1);
    let minZ = zData.minZ;
    let maxZ = zData.maxZ; // System.out.prvarln('y0 '+y0+' yN '+yN);
    // -------------------------
    // Povars attribution
    //
    // 0----1
    // |  / |
    // | /  |
    // 2----3
    //
    // ---------------------d------

    let iter = options.nbContourLevels * 2;
    let contourLevels = new Array(iter);
    let lineZValue;

    for (let level = 0; level < iter; level++) {
      // multiply by 2 for positif and negatif
      let contourLevel = {};
      contourLevels[level] = contourLevel;
      let side = level % 2;
      let factor = (maxZ - options.noiseMultiplier * noise) * Math.exp((level >> 1) - options.nbContourLevels);

      if (side === 0) {
        lineZValue = factor + options.noiseMultiplier * noise;
      } else {
        lineZValue = 0 - factor - options.noiseMultiplier * noise;
      }

      let lines = [];
      contourLevel.zValue = lineZValue;
      contourLevel.lines = lines;
      if (lineZValue <= minZ || lineZValue >= maxZ) continue;

      for (let iSubSpectra = 0; iSubSpectra < nbSubSpectra - 1; iSubSpectra++) {
        let subSpectra = z[iSubSpectra];
        let subSpectraAfter = z[iSubSpectra + 1];

        for (let povar = 0; povar < nbPovars - 1; povar++) {
          povarHeight0 = subSpectra[povar];
          povarHeight1 = subSpectra[povar + 1];
          povarHeight2 = subSpectraAfter[povar];
          povarHeight3 = subSpectraAfter[povar + 1];
          isOver0 = povarHeight0 > lineZValue;
          isOver1 = povarHeight1 > lineZValue;
          isOver2 = povarHeight2 > lineZValue;
          isOver3 = povarHeight3 > lineZValue; // Example povar0 is over the plane and povar1 and
          // povar2 are below, we find the varersections and add
          // the segment

          if (isOver0 !== isOver1 && isOver0 !== isOver2) {
            pAx = povar + (lineZValue - povarHeight0) / (povarHeight1 - povarHeight0);
            pAy = iSubSpectra;
            pBx = povar;
            pBy = iSubSpectra + (lineZValue - povarHeight0) / (povarHeight2 - povarHeight0);
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // remove push does not help !!!!


          if (isOver3 !== isOver1 && isOver3 !== isOver2) {
            pAx = povar + 1;
            pAy = iSubSpectra + 1 - (lineZValue - povarHeight3) / (povarHeight1 - povarHeight3);
            pBx = povar + 1 - (lineZValue - povarHeight3) / (povarHeight2 - povarHeight3);
            pBy = iSubSpectra + 1;
            lines.push(pAx * dx + x0);
            lines.push(pAy * dy + y0);
            lines.push(pBx * dx + x0);
            lines.push(pBy * dy + y0);
          } // test around the diagonal


          if (isOver1 !== isOver2) {
            pAx = (povar + 1 - (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dx + x0;
            pAy = (iSubSpectra + (lineZValue - povarHeight1) / (povarHeight2 - povarHeight1)) * dy + y0;

            if (isOver1 !== isOver0) {
              pBx = povar + 1 - (lineZValue - povarHeight1) / (povarHeight0 - povarHeight1);
              pBy = iSubSpectra;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver0) {
              pBx = povar;
              pBy = iSubSpectra + 1 - (lineZValue - povarHeight2) / (povarHeight0 - povarHeight2);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver1 !== isOver3) {
              pBx = povar + 1;
              pBy = iSubSpectra + (lineZValue - povarHeight1) / (povarHeight3 - povarHeight1);
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }

            if (isOver2 !== isOver3) {
              pBx = povar + (lineZValue - povarHeight2) / (povarHeight3 - povarHeight2);
              pBy = iSubSpectra + 1;
              lines.push(pAx);
              lines.push(pAy);
              lines.push(pBx * dx + x0);
              lines.push(pBy * dy + y0);
            }
          }
        }
      }
    }

    return {
      minX: zData.minX,
      maxX: zData.maxX,
      minY: zData.minY,
      maxY: zData.maxY,
      segments: contourLevels
    };
  }

  function add2D(result, options) {
    let zData = convertTo3DZ(result.spectra);

    if (!options.noContour) {
      result.contourLines = generateContourLines(zData, options);
      delete zData.z;
    }

    result.minMax = zData;
  }

  var fftlib = createCommonjsModule(function (module, exports) {
    /**
     * Fast Fourier Transform module
     * 1D-FFT/IFFT, 2D-FFT/IFFT (radix-2)
     */
    var FFT = function () {
      var FFT;

      {
        FFT = exports; // for CommonJS
      }

      var version = {
        release: '0.3.0',
        date: '2013-03'
      };

      FFT.toString = function () {
        return "version " + version.release + ", released " + version.date;
      }; // core operations


      var _n = 0,
          // order
      _bitrev = null,
          // bit reversal table
      _cstb = null; // sin/cos table

      var core = {
        init: function (n) {
          if (n !== 0 && (n & n - 1) === 0) {
            _n = n;

            core._initArray();

            core._makeBitReversalTable();

            core._makeCosSinTable();
          } else {
            throw new Error("init: radix-2 required");
          }
        },
        // 1D-FFT
        fft1d: function (re, im) {
          core.fft(re, im, 1);
        },
        // 1D-IFFT
        ifft1d: function (re, im) {
          var n = 1 / _n;
          core.fft(re, im, -1);

          for (var i = 0; i < _n; i++) {
            re[i] *= n;
            im[i] *= n;
          }
        },
        // 1D-IFFT
        bt1d: function (re, im) {
          core.fft(re, im, -1);
        },
        // 2D-FFT Not very useful if the number of rows have to be equal to cols
        fft2d: function (re, im) {
          var tre = [],
              tim = [],
              i = 0; // x-axis

          for (var y = 0; y < _n; y++) {
            i = y * _n;

            for (var x1 = 0; x1 < _n; x1++) {
              tre[x1] = re[x1 + i];
              tim[x1] = im[x1 + i];
            }

            core.fft1d(tre, tim);

            for (var x2 = 0; x2 < _n; x2++) {
              re[x2 + i] = tre[x2];
              im[x2 + i] = tim[x2];
            }
          } // y-axis


          for (var x = 0; x < _n; x++) {
            for (var y1 = 0; y1 < _n; y1++) {
              i = x + y1 * _n;
              tre[y1] = re[i];
              tim[y1] = im[i];
            }

            core.fft1d(tre, tim);

            for (var y2 = 0; y2 < _n; y2++) {
              i = x + y2 * _n;
              re[i] = tre[y2];
              im[i] = tim[y2];
            }
          }
        },
        // 2D-IFFT
        ifft2d: function (re, im) {
          var tre = [],
              tim = [],
              i = 0; // x-axis

          for (var y = 0; y < _n; y++) {
            i = y * _n;

            for (var x1 = 0; x1 < _n; x1++) {
              tre[x1] = re[x1 + i];
              tim[x1] = im[x1 + i];
            }

            core.ifft1d(tre, tim);

            for (var x2 = 0; x2 < _n; x2++) {
              re[x2 + i] = tre[x2];
              im[x2 + i] = tim[x2];
            }
          } // y-axis


          for (var x = 0; x < _n; x++) {
            for (var y1 = 0; y1 < _n; y1++) {
              i = x + y1 * _n;
              tre[y1] = re[i];
              tim[y1] = im[i];
            }

            core.ifft1d(tre, tim);

            for (var y2 = 0; y2 < _n; y2++) {
              i = x + y2 * _n;
              re[i] = tre[y2];
              im[i] = tim[y2];
            }
          }
        },
        // core operation of FFT
        fft: function (re, im, inv) {
          var d,
              h,
              ik,
              m,
              tmp,
              wr,
              wi,
              xr,
              xi,
              n4 = _n >> 2; // bit reversal

          for (var l = 0; l < _n; l++) {
            m = _bitrev[l];

            if (l < m) {
              tmp = re[l];
              re[l] = re[m];
              re[m] = tmp;
              tmp = im[l];
              im[l] = im[m];
              im[m] = tmp;
            }
          } // butterfly operation


          for (var k = 1; k < _n; k <<= 1) {
            h = 0;
            d = _n / (k << 1);

            for (var j = 0; j < k; j++) {
              wr = _cstb[h + n4];
              wi = inv * _cstb[h];

              for (var i = j; i < _n; i += k << 1) {
                ik = i + k;
                xr = wr * re[ik] + wi * im[ik];
                xi = wr * im[ik] - wi * re[ik];
                re[ik] = re[i] - xr;
                re[i] += xr;
                im[ik] = im[i] - xi;
                im[i] += xi;
              }

              h += d;
            }
          }
        },
        // initialize the array (supports TypedArray)
        _initArray: function () {
          if (typeof Uint32Array !== 'undefined') {
            _bitrev = new Uint32Array(_n);
          } else {
            _bitrev = [];
          }

          if (typeof Float64Array !== 'undefined') {
            _cstb = new Float64Array(_n * 1.25);
          } else {
            _cstb = [];
          }
        },
        // zero padding
        _paddingZero: function () {// TODO
        },
        // makes bit reversal table
        _makeBitReversalTable: function () {
          var i = 0,
              j = 0,
              k = 0;
          _bitrev[0] = 0;

          while (++i < _n) {
            k = _n >> 1;

            while (k <= j) {
              j -= k;
              k >>= 1;
            }

            j += k;
            _bitrev[i] = j;
          }
        },
        // makes trigonometiric function table
        _makeCosSinTable: function () {
          var n2 = _n >> 1,
              n4 = _n >> 2,
              n8 = _n >> 3,
              n2p4 = n2 + n4,
              t = Math.sin(Math.PI / _n),
              dc = 2 * t * t,
              ds = Math.sqrt(dc * (2 - dc)),
              c = _cstb[n4] = 1,
              s = _cstb[0] = 0;
          t = 2 * dc;

          for (var i = 1; i < n8; i++) {
            c -= dc;
            dc += t * c;
            s += ds;
            ds -= t * s;
            _cstb[i] = s;
            _cstb[n4 - i] = c;
          }

          if (n8 !== 0) {
            _cstb[n8] = Math.sqrt(0.5);
          }

          for (var j = 0; j < n4; j++) {
            _cstb[n2 - j] = _cstb[j];
          }

          for (var k = 0; k < n2p4; k++) {
            _cstb[k + n2] = -_cstb[k];
          }
        }
      }; // aliases (public APIs)

      var apis = ['init', 'fft1d', 'ifft1d', 'fft2d', 'ifft2d'];

      for (var i = 0; i < apis.length; i++) {
        FFT[apis[i]] = core[apis[i]];
      }

      FFT.bt = core.bt1d;
      FFT.fft = core.fft1d;
      FFT.ifft = core.ifft1d;
      return FFT;
    }.call(commonjsGlobal);
  });

  // sources:
  // https://en.wikipedia.org/wiki/Gyromagnetic_ratio
  // TODO: can we have a better source and more digits ? @jwist
  const gyromagneticRatio = {
    '1H': 267.52218744e6,
    '2H': 41.065e6,
    '3H': 285.3508e6,
    '3He': -203.789e6,
    '7Li': 103.962e6,
    '13C': 67.28284e6,
    '14N': 19.331e6,
    '15N': -27.116e6,
    '17O': -36.264e6,
    '19F': 251.662e6,
    '23Na': 70.761e6,
    '27Al': 69.763e6,
    '29Si': -53.19e6,
    '31P': 108.291e6,
    '57Fe': 8.681e6,
    '63Cu': 71.118e6,
    '67Zn': 16.767e6,
    '129Xe': -73.997e6
  };

  function postProcessingNMR(entriesFlat) {
    // specific NMR functions
    let observeFrequency = 0;
    let shiftOffsetVal = 0;

    for (let entry of entriesFlat) {
      for (let spectrum of entry.spectra) {
        if (entry.ntuples && entry.ntuples.symbol) {
          if (!observeFrequency && spectrum.observeFrequency) {
            observeFrequency = spectrum.observeFrequency;
          }

          if (!shiftOffsetVal && spectrum.shiftOffsetVal) {
            shiftOffsetVal = spectrum.shiftOffsetVal;
          }
        } else {
          observeFrequency = spectrum.observeFrequency;
          shiftOffsetVal = spectrum.shiftOffsetVal;
        }

        if (observeFrequency) {
          if (spectrum.xUnits && spectrum.xUnits.toUpperCase().includes('HZ')) {
            spectrum.xUnits = 'PPM';
            spectrum.xFactor = spectrum.xFactor / observeFrequency;
            spectrum.firstX = spectrum.firstX / observeFrequency;
            spectrum.lastX = spectrum.lastX / observeFrequency;
            spectrum.deltaX = spectrum.deltaX / observeFrequency;

            for (let i = 0; i < spectrum.data.x.length; i++) {
              spectrum.data.x[i] /= observeFrequency;
            }
          }
        }

        if (shiftOffsetVal) {
          let shift = spectrum.firstX - shiftOffsetVal;
          spectrum.firstX = spectrum.firstX - shift;
          spectrum.lastX = spectrum.lastX - shift;

          for (let i = 0; i < spectrum.data.x.length; i++) {
            spectrum.data.x[i] -= shift;
          }
        }

        if (observeFrequency && entry.ntuples && entry.ntuples.symbol && entry.ntuples.nucleus) {
          let unit = '';
          let pageSymbolIndex = entry.ntuples.symbol.indexOf(spectrum.pageSymbol);

          if (entry.ntuples.units && entry.ntuples.units[pageSymbolIndex]) {
            unit = entry.ntuples.units[pageSymbolIndex];
          }

          if (unit !== 'PPM') {
            if (pageSymbolIndex !== 0) {
              throw Error('Not sure about this ntuples format');
            }

            let ratio0 = gyromagneticRatio[entry.ntuples.nucleus[0]];
            let ratio1 = gyromagneticRatio[entry.ntuples.nucleus[1]];

            if (!ratio0 || !ratio1) {
              throw Error('Problem with determination of gyromagnetic ratio');
            }

            let ratio = ratio0 / ratio1 * observeFrequency;
            spectrum.pageValue /= ratio;
          }
        }
      }
    }
  }

  function profiling(result, action, options) {
    if (result.profiling) {
      result.profiling.push({
        action,
        time: Date.now() - options.start
      });
    }
  }

  function simpleChromatogram(result) {
    let data = result.spectra[0].data;
    result.chromatogram = {
      times: data.x.slice(),
      series: {
        intensity: {
          dimension: 1,
          data: data.y.slice()
        }
      }
    };
  }

  function postProcessing(entriesFlat, result, options) {
    // converting Hz to ppm
    postProcessingNMR(entriesFlat);

    for (let entry of entriesFlat) {
      if (Object.keys(entry.ntuples).length > 0) {
        let newNtuples = [];
        let keys = Object.keys(entry.ntuples);

        for (let i = 0; i < keys.length; i++) {
          let key = keys[i];
          let values = entry.ntuples[key];

          for (let j = 0; j < values.length; j++) {
            if (!newNtuples[j]) newNtuples[j] = {};
            newNtuples[j][key] = values[j];
          }
        }

        entry.ntuples = newNtuples;
      }

      if (entry.twoD && options.wantXY) {
        add2D(entry, options);
        profiling(result, 'Finished countour plot calculation', options);

        if (!options.keepSpectra) {
          delete entry.spectra;
        }
      } // maybe it is a GC (HPLC) / MS. In this case we add a new format


      if (options.chromatogram) {
        if (entry.spectra.length > 1) {
          complexChromatogram(entry);
        } else {
          simpleChromatogram(entry);
        }

        profiling(result, 'Finished chromatogram calculation', options);
      }
    }
  }

  function prepareNtuplesDatatable(currentEntry, spectrum, kind) {
    let xIndex = -1;
    let yIndex = -1;
    let firstVariable = '';
    let secondVariable = '';

    if (kind.indexOf('++') > 0) {
      firstVariable = kind.replace(/.*\(([a-zA-Z0-9]+)\+\+.*/, '$1');
      secondVariable = kind.replace(/.*\.\.([a-zA-Z0-9]+).*/, '$1');
    } else {
      kind = kind.replace(/[^a-zA-Z]/g, '');
      firstVariable = kind.charAt(0);
      secondVariable = kind.charAt(1);
      spectrum.variables = {};

      for (let symbol of kind) {
        let lowerCaseSymbol = symbol.toLowerCase();
        let index = currentEntry.ntuples.symbol.indexOf(symbol);
        if (index === -1) throw Error(`Symbol undefined: ${symbol}`);
        spectrum.variables[lowerCaseSymbol] = {};

        for (let key in currentEntry.ntuples) {
          if (currentEntry.ntuples[key][index]) {
            spectrum.variables[lowerCaseSymbol][key.replace(/^var/, '')] = currentEntry.ntuples[key][index];
          }
        }
      }
    }

    xIndex = currentEntry.ntuples.symbol.indexOf(firstVariable);
    yIndex = currentEntry.ntuples.symbol.indexOf(secondVariable);
    if (xIndex === -1) xIndex = 0;
    if (yIndex === -1) yIndex = 0;

    if (currentEntry.ntuples.first) {
      if (currentEntry.ntuples.first.length > xIndex) {
        spectrum.firstX = currentEntry.ntuples.first[xIndex];
      }

      if (currentEntry.ntuples.first.length > yIndex) {
        spectrum.firstY = currentEntry.ntuples.first[yIndex];
      }
    }

    if (currentEntry.ntuples.last) {
      if (currentEntry.ntuples.last.length > xIndex) {
        spectrum.lastX = currentEntry.ntuples.last[xIndex];
      }

      if (currentEntry.ntuples.last.length > yIndex) {
        spectrum.lastY = currentEntry.ntuples.last[yIndex];
      }
    }

    if (currentEntry.ntuples.vardim && currentEntry.ntuples.vardim.length > xIndex) {
      spectrum.nbPoints = currentEntry.ntuples.vardim[xIndex];
    }

    if (currentEntry.ntuples.factor) {
      if (currentEntry.ntuples.factor.length > xIndex) {
        spectrum.xFactor = currentEntry.ntuples.factor[xIndex];
      }

      if (currentEntry.ntuples.factor.length > yIndex) {
        spectrum.yFactor = currentEntry.ntuples.factor[yIndex];
      }
    }

    if (currentEntry.ntuples.units) {
      if (currentEntry.ntuples.units.length > xIndex) {
        if (currentEntry.ntuples.varname && currentEntry.ntuples.varname[xIndex]) {
          spectrum.xUnits = `${currentEntry.ntuples.varname[xIndex]} [${currentEntry.ntuples.units[xIndex]}]`;
        } else {
          spectrum.xUnits = currentEntry.ntuples.units[xIndex];
        }
      }

      if (currentEntry.ntuples.units.length > yIndex) {
        if (currentEntry.ntuples.varname && currentEntry.ntuples.varname[yIndex]) {
          spectrum.yUnits = `${currentEntry.ntuples.varname[yIndex]} [${currentEntry.ntuples.units[yIndex]}]`;
        } else {
          spectrum.yUnits = currentEntry.ntuples.units[yIndex];
        }
      }
    }
  }

  function prepareSpectrum(spectrum) {
    if (!spectrum.xFactor) spectrum.xFactor = 1;
    if (!spectrum.yFactor) spectrum.yFactor = 1;
  }

  const ntuplesSeparator = /[ \t]*,[ \t]*/;

  class Spectrum {}

  const defaultOptions$2 = {
    keepRecordsRegExp: /^$/,
    canonicDataLabels: true,
    canonicMetadataLabels: false,
    dynamicTyping: true,
    withoutXY: false,
    chromatogram: false,
    keepSpectra: false,
    noContour: false,
    nbContourLevels: 7,
    noiseMultiplier: 5,
    profiling: false
  };
  /**
   *
   * @param {text} jcamp
   * @param {object} [options]
   * @param {number} [options.keepRecordsRegExp=/^$/] By default we don't keep meta information
   * @param {number} [options.canonicDataLabels=true] Canonize the Labels (uppercase without symbol)
   * @param {number} [options.canonicMetadataLabels=false] Canonize the metadata Labels (uppercase without symbol)
   * @param {number} [options.dynamicTyping=false] Convert numbers to Number
   * @param {number} [options.withoutXY=false] Remove the XY data
   * @param {number} [options.chromatogram=false] Special post-processing for GC / HPLC / MS
   * @param {number} [options.keepSpectra=false] Force to keep the spectra in case of 2D
   * @param {number} [options.noContour=false] Don't calculate countour in case of 2D
   * @param {number} [options.nbContourLevels=7] Number of positive / negative contour levels to calculate
   * @param {number} [options.noiseMultiplier=5] Define for 2D the level as 5 times the median as default
   * @param {number} [options.profiling=false] Add profiling information
   */

  function convert(jcamp, options = {}) {
    options = Object.assign({}, defaultOptions$2, options);
    options.wantXY = !options.withoutXY;
    options.start = Date.now();
    let entriesFlat = [];
    let result = {
      profiling: options.profiling ? [] : false,
      logs: [],
      entries: []
    };
    let tmpResult = {
      children: []
    };
    let currentEntry = tmpResult;
    let parentsStack = [];
    let spectrum = new Spectrum();

    if (typeof jcamp !== 'string') {
      throw new TypeError('the JCAMP should be a string');
    }

    profiling(result, 'Before split to LDRS', options);
    let ldrs = jcamp.replace(/[\r\n]+##/g, '\n##').split('\n##');
    profiling(result, 'Split to LDRS', options);
    if (ldrs[0]) ldrs[0] = ldrs[0].replace(/^[\r\n ]*##/, '');

    for (let ldr of ldrs) {
      // This is a new LDR
      let position = ldr.indexOf('=');
      let dataLabel = position > 0 ? ldr.substring(0, position) : ldr;
      let dataValue = position > 0 ? ldr.substring(position + 1).trim() : '';
      let canonicDataLabel = dataLabel.replace(/[_ -]/g, '').toUpperCase();

      if (canonicDataLabel === 'DATATABLE') {
        let endLine = dataValue.indexOf('\n');
        if (endLine === -1) endLine = dataValue.indexOf('\r');

        if (endLine > 0) {
          // ##DATA TABLE= (X++(I..I)), XYDATA
          // We need to find the variables
          let infos = dataValue.substring(0, endLine).split(/[ ,;\t]+/);
          prepareNtuplesDatatable(currentEntry, spectrum, infos[0]);
          spectrum.datatable = infos[0];

          if (infos[1] && infos[1].indexOf('PEAKS') > -1) {
            canonicDataLabel = 'PEAKTABLE';
          } else if (infos[1] && (infos[1].indexOf('XYDATA') || infos[0].indexOf('++') > 0)) {
            canonicDataLabel = 'XYDATA';
            spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
          }
        }
      }

      if (canonicDataLabel === 'XYDATA') {
        if (options.wantXY) {
          prepareSpectrum(spectrum); // well apparently we should still consider it is a PEAK TABLE if there are no '++' after

          if (dataValue.match(/.*\+\+.*/)) {
            // ex: (X++(Y..Y))
            if (!spectrum.deltaX) {
              spectrum.deltaX = (spectrum.lastX - spectrum.firstX) / (spectrum.nbPoints - 1);
            }

            fastParseXYData(spectrum, dataValue);
          } else {
            parsePeakTable(spectrum, dataValue, result);
          }

          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      } else if (canonicDataLabel === 'PEAKTABLE') {
        if (options.wantXY) {
          prepareSpectrum(spectrum);
          parsePeakTable(spectrum, dataValue, result);
          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (canonicDataLabel === 'PEAKASSIGNMENTS') {
        if (options.wantXY) {
          if (dataValue.match(/.*(XYA).*/)) {
            // ex: (XYA)
            parseXYA(spectrum, dataValue);
          }

          currentEntry.spectra.push(spectrum);
          spectrum = new Spectrum();
        }

        continue;
      }

      if (canonicDataLabel === 'TITLE') {
        let parentEntry = currentEntry;

        if (!parentEntry.children) {
          parentEntry.children = [];
        }

        currentEntry = {
          spectra: [],
          ntuples: {},
          info: {},
          meta: {}
        };
        parentEntry.children.push(currentEntry);
        parentsStack.push(parentEntry);
        entriesFlat.push(currentEntry);
        currentEntry.title = dataValue;
      } else if (canonicDataLabel === 'DATATYPE') {
        currentEntry.dataType = dataValue;

        if (dataValue.toLowerCase().indexOf('nd') > -1) {
          currentEntry.twoD = true;
        }
      } else if (canonicDataLabel === 'NTUPLES') {
        if (dataValue.toLowerCase().indexOf('nd') > -1) {
          currentEntry.twoD = true;
        }
      } else if (canonicDataLabel === 'DATACLASS') {
        currentEntry.dataClass = dataValue;
      } else if (canonicDataLabel === 'XUNITS') {
        spectrum.xUnits = dataValue;
      } else if (canonicDataLabel === 'YUNITS') {
        spectrum.yUnits = dataValue;
      } else if (canonicDataLabel === 'FIRSTX') {
        spectrum.firstX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'LASTX') {
        spectrum.lastX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'FIRSTY') {
        spectrum.firstY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'LASTY') {
        spectrum.lastY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'NPOINTS') {
        spectrum.nbPoints = parseFloat(dataValue);
      } else if (canonicDataLabel === 'XFACTOR') {
        spectrum.xFactor = parseFloat(dataValue);
      } else if (canonicDataLabel === 'YFACTOR') {
        spectrum.yFactor = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MAXX') {
        spectrum.maxX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MINX') {
        spectrum.minX = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MAXY') {
        spectrum.maxY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'MINY') {
        spectrum.minY = parseFloat(dataValue);
      } else if (canonicDataLabel === 'DELTAX') {
        spectrum.deltaX = parseFloat(dataValue);
      } else if (canonicDataLabel === '.OBSERVEFREQUENCY' || canonicDataLabel === '$SFO1') {
        if (!spectrum.observeFrequency) {
          spectrum.observeFrequency = parseFloat(dataValue);
        }
      } else if (canonicDataLabel === '.OBSERVENUCLEUS') {
        if (!spectrum.xType) {
          currentEntry.xType = dataValue.replace(/[^a-zA-Z0-9]/g, '');
        }
      } else if (canonicDataLabel === '$OFFSET') {
        // OFFSET for Bruker spectra
        currentEntry.shiftOffsetNum = 0;

        if (!spectrum.shiftOffsetVal) {
          spectrum.shiftOffsetVal = parseFloat(dataValue);
        }
      } else if (canonicDataLabel === '$REFERENCEPOINT') ; else if (canonicDataLabel === 'VARNAME') {
        currentEntry.ntuples.varname = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'SYMBOL') {
        currentEntry.ntuples.symbol = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'VARTYPE') {
        currentEntry.ntuples.vartype = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'VARFORM') {
        currentEntry.ntuples.varform = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'VARDIM') {
        currentEntry.ntuples.vardim = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'UNITS') {
        currentEntry.ntuples.units = dataValue.split(ntuplesSeparator);
      } else if (canonicDataLabel === 'FACTOR') {
        currentEntry.ntuples.factor = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'FIRST') {
        currentEntry.ntuples.first = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'LAST') {
        currentEntry.ntuples.last = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'MIN') {
        currentEntry.ntuples.min = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === 'MAX') {
        currentEntry.ntuples.max = convertToFloatArray(dataValue.split(ntuplesSeparator));
      } else if (canonicDataLabel === '.NUCLEUS') {
        if (currentEntry.ntuples) {
          currentEntry.ntuples.nucleus = dataValue.split(ntuplesSeparator);
        }

        if (currentEntry.twoD) {
          currentEntry.yType = dataValue.split(ntuplesSeparator)[0];
        }
      } else if (canonicDataLabel === 'PAGE') {
        spectrum.page = dataValue.trim();
        spectrum.pageValue = parseFloat(dataValue.replace(/^.*=/, ''));
        spectrum.pageSymbol = spectrum.page.replace(/[=].*/, '');
      } else if (canonicDataLabel === 'RETENTIONTIME') {
        spectrum.pageValue = parseFloat(dataValue);
      } else if (isMSField(canonicDataLabel)) {
        spectrum[convertMSFieldToLabel(canonicDataLabel)] = dataValue;
      } else if (canonicDataLabel === 'SAMPLEDESCRIPTION') {
        spectrum.sampleDescription = dataValue;
      } else if (canonicDataLabel === 'END') {
        currentEntry = parentsStack.pop();
      }

      if (currentEntry && currentEntry.info && currentEntry.meta && canonicDataLabel.match(options.keepRecordsRegExp)) {
        let value = dataValue.trim();
        let target, label;

        if (dataLabel.startsWith('$')) {
          label = options.canonicMetadataLabels ? canonicDataLabel.substring(1) : dataLabel.substring(1);
          target = currentEntry.meta;
        } else {
          label = options.canonicDataLabels ? canonicDataLabel : dataLabel;
          target = currentEntry.info;
        }

        if (options.dynamicTyping) {
          let parsedValue = Number.parseFloat(value);
          if (!Number.isNaN(parsedValue)) value = parsedValue;
        }

        if (target[label]) {
          if (!Array.isArray(target[label])) {
            target[label] = [target[label]];
          }

          target[label].push(value);
        } else {
          target[label] = value;
        }
      }
    }

    profiling(result, 'Finished parsing', options);
    postProcessing(entriesFlat, result, options);
    profiling(result, 'Total time', options);
    /*
    if (result.children && result.children.length>0) {
      result = { ...result, ...result.children[0] };
    }
    */

    result.entries = tmpResult.children;
    result.flatten = entriesFlat;
    return result;
  }

  /**
   * Creates a new Analysis from a JCAMP string
   * @param {string} jcamp - String containing the JCAMP data
   * @param {object} [options={}]
   * @param {object} [options.id=Math.random()]
   * @param {string} [options.label=options.id] human redeable label
   * @return {Analysis} - New class element with the given data
   */

  function fromJcamp(jcamp, options = {}) {
    let analysis = new Analysis(options);
    addJcamp(analysis, jcamp);
    return analysis;
  }

  function addJcamp(analysis, jcamp) {
    let converted = convert(jcamp, {
      keepRecordsRegExp: /.*/
    });

    for (let entry of converted.flatten) {
      let currentSpectrum = entry.spectra[0]; // we ensure variables

      if (!currentSpectrum.variables) {
        const variables = {};
        currentSpectrum.variables = variables;
        variables.x = {
          label: currentSpectrum.xUnits,
          symbol: 'X',
          data: currentSpectrum.data.x || currentSpectrum.data.X
        };
        variables.y = {
          label: currentSpectrum.yUnits,
          symbol: 'Y',
          data: currentSpectrum.data.y || currentSpectrum.data.Y
        };
      } else {
        for (let key in currentSpectrum.variables) {
          const variable = currentSpectrum.variables[key];
          if (variable.label) continue;
          variable.label = variable.name || variable.symbol || key;

          if (variable.units && !variable.label.includes(variable.units)) {
            variable.label += ` [${variable.units}]`;
          }
        }
      }

      analysis.pushSpectrum(currentSpectrum.variables, {
        dataType: entry.dataType,
        title: entry.title,
        meta: entry.meta
      });
    }
  }

  function addStyle(serie, spectrum, options = {}) {
    const {
      color = 'darkgrey'
    } = options;
    serie.style = [{
      name: 'unselected',
      style: {
        line: {
          color,
          width: 1,
          dash: 1
        }
      }
    }, {
      name: 'selected',
      style: {
        line: {
          color,
          width: 3,
          dash: 1
        }
      }
    }];
    serie.name = spectrum.label || spectrum.id;
  }

  const COLORS = ['#FFB300', '#803E75', '#FF6800', '#A6BDD7', '#C10020', '#CEA262', '#817066', '#007D34', '#F6768E', '#00538A', '#FF7A5C', '#53377A', '#FF8E00', '#B32851', '#F4C800', '#7F180D', '#93AA00', '#593315', '#F13A13', '#232C16'];

  /**
   * Generate a jsgraph chart format from an array of Analysis
   * @param {Array<Analysis>} analyses
   * @param {object} [options={}]
   * @param {Array} [options.ids] List of spectra ids, by all
   * @param {Array} [options.colors] List of colors
   * @param {object} [options.selector={}]
   * @param {object} [options.normalization]
   */

  function getJSGraph(analyses, options = {}) {
    const {
      colors = COLORS,
      selector,
      normalization
    } = options;
    let series = [];
    let xLabel = '';
    let yLabel = '';

    for (let i = 0; i < analyses.length; i++) {
      const analysis = analyses[i];
      let serie = {};
      let currentData = analysis.getNormalizedData({
        selector,
        normalization
      });
      if (!currentData) continue;
      if (!xLabel) xLabel = analysis.getXLabel(selector);
      if (!yLabel) yLabel = analysis.getYLabel(selector);
      addStyle(serie, analysis, {
        color: colors[i]
      });
      serie.data = currentData;
      series.push(serie);
    }

    return {
      axes: {
        x: {
          label: xLabel,
          unit: '',
          unitWrapperBefore: '',
          unitWrapperAfter: '',
          flipped: false,
          display: true
        },
        y: {
          label: yLabel,
          unit: '',
          unitWrapperBefore: '',
          unitWrapperAfter: '',
          flipped: false,
          display: true
        }
      },
      series
    };
  }

  function getNormalizationAnnotations(filter = {}, boundary) {
    let {
      exclusions = []
    } = filter;
    let annotations = [];
    exclusions = exclusions.filter(exclusion => !exclusion.ignore);
    annotations = exclusions.map(exclusion => {
      let annotation = {
        type: 'rect',
        position: [{
          x: exclusion.from,
          y: boundary.y.min
        }, {
          x: exclusion.to,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      };
      return annotation;
    });

    if (filter.from !== undefined) {
      annotations.push({
        type: 'rect',
        position: [{
          x: Number.MIN_SAFE_INTEGER,
          y: boundary.y.min
        }, {
          x: filter.from,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      });
    }

    if (filter.to !== undefined) {
      annotations.push({
        type: 'rect',
        position: [{
          x: filter.to,
          y: boundary.y.min
        }, {
          x: Number.MAX_SAFE_INTEGER,
          y: boundary.y.max
        }],
        strokeWidth: 0,
        fillColor: 'rgba(255,255,224,1)'
      });
    }

    return annotations;
  }

  /**
   * Parse from a xyxy data array
   * @param {Array<Array<number>>} variables
   * @param {object} [meta] - same metadata object format that the fromText
   * @return {string} JCAMP of the input
   */

  function creatorNtuples(variables, options) {
    const {
      meta = {},
      info = {}
    } = options;
    const {
      title = '',
      owner = '',
      origin = '',
      dataType = ''
    } = info;
    const symbol = [];
    const varName = [];
    const varType = [];
    const varDim = [];
    const units = [];
    const first = [];
    const last = [];
    const min$1 = [];
    const max$1 = [];
    const keys = Object.keys(variables);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let variable = variables[key];
      let name = variable.label && variable.label.replace(/ *\[.*/, '');
      let unit = variable.label && variable.label.replace(/.*\[(.*)\].*/, '$1');
      symbol.push(variable.symbol || key);
      varName.push(variable.name || name || key);
      varDim.push(variables[key].data.length);
      varType.push(variable.type ? variable.type.toUpperCase() : i === 0 ? 'INDEPENDENT' : 'DEPENDENT');
      units.push(variable.units || unit || '');
      first.push(variables[key][0]);
      last.push(variables[key][variables[key].length - 1]);
      min$1.push(min(variables[key].data));
      max$1.push(max(variables[key].data));
    }

    let header = `##TITLE=${title}
##JCAMP-DX=6.00
##DATA TYPE=${dataType}
##ORIGIN=${origin}
##OWNER=${owner}\n`;

    for (const key of Object.keys(meta)) {
      header += `##$${key}=${meta[key]}\n`;
    }

    header += `##NTUPLES= ${dataType}
##VAR_NAME=  ${varName.join()}
##SYMBOL=    ${symbol.join()}
##VAR_TYPE=  ${varType.join()}
##VAR_DIM=   ${varDim.join()}
##UNITS=     ${units.join()}
##PAGE= N=1\n`;
    header += `##DATA TABLE= (${symbol.join('')}..${symbol.join('')}), PEAKS\n`;

    for (let i = 0; i < variables[keys[0]].data.length; i++) {
      let point = [];

      for (let key of keys) {
        point.push(variables[key].data[i]);
      }

      header += `${point.join('\t')}\n`;
    }

    header += '##END';
    return header;
  }

  /**
   * Create a jcamp
   * @param {object} data - object of array
   * @param {object} [options={}] - metadata object
   * @param {string} [options.info={}] - metadata of the file
   * @param {string} [options.info.title = ''] - title of the file
   * @param {string} [options.info.owner = ''] - owner of the file
   * @param {string} [options.info.origin = ''] - origin of the file
   * @param {string} [options.info.dataType = ''] - type of data
   * @param {string} [options.info.xUnits = ''] - units for the x axis for variables===undefined
   * @param {string} [options.info.yUnits = ''] - units for the y axis for variables===undefined
   * @param {object} [options.meta = {}] - comments to add to the file

   * @return {string} JCAMP of the input
   */
  function fromJSON(data, options = {}) {
    const {
      meta = {},
      info = {}
    } = options;
    const {
      title = '',
      owner = '',
      origin = '',
      dataType = '',
      xUnits = '',
      yUnits = ''
    } = info;
    let firstX = Number.POSITIVE_INFINITY;
    let lastX = Number.NEGATIVE_INFINITY;
    let firstY = Number.POSITIVE_INFINITY;
    let lastY = Number.NEGATIVE_INFINITY;
    let points = [];

    for (let i = 0; i < data.x.length; i++) {
      let x = data.x[i];
      let y = data.y[i];

      if (firstX > x) {
        firstX = x;
      }

      if (lastX < x) {
        lastX = x;
      }

      if (firstY > y) {
        firstY = y;
      }

      if (lastY < y) {
        lastY = y;
      }

      points.push(`${x} ${y}`);
    }

    let header = `##TITLE=${title}
##JCAMP-DX=4.24
##DATA TYPE=${dataType}
##ORIGIN=${origin}
##OWNER=${owner}
##XUNITS=${xUnits}
##YUNITS=${yUnits}
##FIRSTX=${firstX}
##LASTX=${lastX}
##FIRSTY=${firstY}
##LASTY=${lastY}\n`;

    for (const key of Object.keys(meta)) {
      header += `##$${key}=${meta[key]}\n`;
    } // we leave the header and utf8 fonts ${header.replace(/[^\t\r\n\x20-\x7F]/g, '')


    return `${header}##NPOINTS=${points.length}
##PEAK TABLE=(XY..XY)
${points.join('\n')}
##END`;
  }

  /**
   * Create a jcamp from variables
   * @param {Array<Variable} [variables={}] - object of variables
   * @param {string} [options.info={}] - metadata of the file
   * @param {string} [options.info.title = ''] - title of the file
   * @param {string} [options.info.owner = ''] - owner of the file
   * @param {string} [options.info.origin = ''] - origin of the file
   * @param {string} [options.info.dataType = ''] - type of data
   * @param {object} [options.meta = {}] - comments to add to the file
   * @param {object} [options.forceNtuples = false] - force the ntuples format even if there is only x and y variables
   */

  function fromVariables(variables = {}, options = {}) {
    const {
      info,
      meta,
      forceNtuples
    } = options;
    let jcampOptions = {
      info,
      meta
    };
    let keys = Object.keys(variables).map(key => key.toLowerCase());

    if (keys.length === 2 && keys.includes('x') && keys.includes('y') && !forceNtuples) {
      let x = variables.x;
      let xLabel = x.label || x.name || 'x';
      jcampOptions.info.xUnits = xLabel.includes(variables.x.units) ? xLabel : `${xLabel} [${variables.x.units}]`;
      let y = variables.y;
      let yLabel = y.label || y.name || 'y';
      jcampOptions.info.yUnits = yLabel.includes(variables.y.units) ? yLabel : `${yLabel} [${variables.y.units}]`;
      return fromJSON({
        x: variables.x.data,
        y: variables.y.data
      }, jcampOptions);
    } else {
      return creatorNtuples(variables, options);
    }
  }

  function toJcamp(analysis, options = {}) {
    let jcamps = [];

    for (let spectrum of analysis.spectra) {
      jcamps.push(getJcamp(spectrum, options));
    }

    return jcamps.join('\n');
  }

  function getJcamp(spectrum, options) {
    const {
      info = {},
      meta = {}
    } = options;
    let jcampOptions = {
      options: {},
      info: {
        title: spectrum.title,
        dataType: spectrum.dataType,
        ...info
      },
      meta: { ...spectrum.meta,
        ...meta
      }
    };
    return fromVariables(spectrum.variables, jcampOptions);
  }

  /**
   * Computes the mean of the given values
   * @param {Array<number>} input
   * @return {number}
   */

  function mean(input) {
    return sum(input) / input.length;
  }

  function lineSplitTrim(line) {
    return lineSplit(line)[1].trim();
  }
  function lineSplit(line) {
    return line.split(/\s{4,}/);
  }

  function parseIGAMeasurmentHeader(lines) {
    let metaData = {}; // Let's use some cleaner names

    metaData.systemType = lineSplitTrim(lines[0]);
    metaData.systemOwner = lineSplitTrim(lines[1]);
    metaData.systemReference = lineSplitTrim(lines[2]);
    metaData.systemSerialNumber = lineSplitTrim(lines[3]);
    metaData.sampleNumber = lineSplitTrim(lines[4]);
    metaData.experimentType = lineSplitTrim(lines[5]); // eslint-disable-next-line radix

    metaData.experimentNumber = parseInt(lineSplitTrim(lines[6]));
    metaData.title = lineSplitTrim(lines[7]);
    metaData.comment = lineSplitTrim(lines[8]);
    metaData.source = lineSplitTrim(lines[9]);
    metaData.batch = lineSplitTrim(lines[10]);
    metaData.id = lineSplitTrim(lines[11]);
    metaData.experimentTitle = lineSplitTrim(lines[12]);
    let tmp = lineSplitTrim(lines[14]).split(/\s/);
    metaData.sampleWeight = parseFloat(tmp[0]);
    metaData.sampleWeightUnit = tmp[1];
    tmp = lineSplitTrim(lines[15]).split(/\s/);
    metaData.sampleWeightDry = parseFloat(tmp[0]);
    metaData.sampleWeightDryUnit = tmp[1];
    tmp = lineSplitTrim(lines[18]).split(/\s/);
    metaData.balanceTrimV = parseFloat(tmp[0]);
    metaData.balanceTrimVUnit = tmp[1];
    metaData.balanceTrimT = lineSplitTrim(lines[19]);
    tmp = lineSplitTrim(lines[20]).split(/\s/);
    metaData.counterWeightM = parseFloat(tmp[0]);
    metaData.counterWeightMUnit = tmp[1];
    tmp = lineSplitTrim(lines[21]).split(/\s/);
    metaData.counterWeightRho = parseFloat(tmp[0]);
    metaData.counterWeightRhoUnit = tmp[1];
    metaData.counterWeightT = lineSplitTrim(lines[22]);
    tmp = lineSplitTrim(lines[23]).split(/\s/);
    metaData.tungstenM = parseFloat(tmp[0]);
    metaData.tungstenMUnit = tmp[1];
    tmp = lineSplitTrim(lines[24]).split(/\s/);
    metaData.tungstenRho = parseFloat(tmp[0]);
    metaData.tungstenRhoUnit = tmp[1];
    metaData.counterWeightT = lineSplitTrim(lines[25]);
    tmp = lineSplitTrim(lines[26]).split(/\s/);
    metaData.chainExcessM = parseFloat(tmp[0]);
    metaData.chainExcessMUnit = tmp[1];
    tmp = lineSplitTrim(lines[27]).split(/\s/);
    metaData.chainExcessRho = parseFloat(tmp[0]);
    metaData.chainExcessRhoUnit = tmp[1];
    metaData.chainExcessT = lineSplitTrim(lines[28]);
    metaData.applicationCode = lineSplitTrim(lines[44]);
    metaData.mode = lineSplitTrim(lines[44]);
    metaData.source = lineSplitTrim(lines[45]);
    metaData.gasSource = lineSplitTrim(lines[46]);
    metaData.vessel = lineSplitTrim(lines[47]);
    metaData.reactor = lineSplitTrim(lines[48]);
    metaData.pressureSensor = lineSplitTrim(lines[49]);
    metaData.thermostat = lineSplitTrim(lines[50]);
    metaData.nitrogenEOS = lineSplitTrim(lines[51]);
    metaData.nitrogenSVP = lineSplitTrim(lines[52]);
    metaData.seriesType = lineSplitTrim(lines[59]);
    metaData.scan = parseInt(lineSplitTrim(lines[61]), 10);
    metaData.course = lineSplitTrim(lines[62]);
    metaData.referenceStateDevice = lineSplitTrim(lines[63]);
    metaData.scanTitle = lineSplitTrim(lines[64]);
    metaData.scanStart = lineSplitTrim(lines[65]);
    return metaData;
  }

  function getLineNumbersOfMeasurement(lines) {
    let starts = [];
    let ends = [];

    for (let [index, line] of lines.entries()) {
      if (line.match('S E R I E S   D A T A   R E C O R D')) {
        starts.push(index);
      } else if (line.match('Scan Ends ')) {
        ends.push(index + 2);
      }
    }

    return [starts, ends];
  }

  function parseIGADataBlock(lines) {
    let dataBlock = {
      pressure: [],
      gasDensity: [],
      pp0: [],
      totalWeight: [],
      bet: [],
      excessAdsorptionPercentage: [],
      excessAdsorption: [],
      sampleT: [],
      wtPercent: []
    };

    for (let line of lines) {
      let tmp = line.split(/\s{3,}/);
      dataBlock.pressure.push(parseFloat(tmp[0]) * 0.1);
      dataBlock.gasDensity.push(parseFloat(tmp[1]));
      dataBlock.pp0.push(parseFloat(tmp[2]));
      dataBlock.totalWeight.push(parseFloat(tmp[3]));
      dataBlock.excessAdsorptionPercentage.push(parseFloat(tmp[4]));
      dataBlock.excessAdsorption.push(parseFloat(tmp[5]));
      dataBlock.bet.push(parseFloat(tmp[6]));
      dataBlock.sampleT.push(parseFloat(tmp[7]));
      dataBlock.wtPercent.push(parseFloat(tmp[8]));
    }

    return dataBlock;
  }

  function parseOneIGA(lines) {
    const measLen = lines.length;
    let meta = parseIGAMeasurmentHeader(lines.slice(2, 68));
    const dataBlock = parseIGADataBlock(lines.slice(72, measLen - 3));
    meta.scanEnd = lineSplitTrim(lines[measLen - 2]);
    meta.scanReferenceState = lineSplitTrim(lines[measLen - 1]);
    return {
      meta: meta,
      data: dataBlock
    };
  }
  /**
   * Creates a new Analysis element
   * @param {string} text - String containing the IGA analysis data, maybe contain multiple measurements
   * @return {Analysis} - New class element with the given data
   */


  function fromIGA(text) {
    const lines = text.split(/[\r\n]+/);
    const lineNumbers = getLineNumbersOfMeasurement(lines);
    let analysis = new Analysis();

    for (let i = 0; i < lineNumbers[0].length; i++) {
      let meas = parseOneIGA(lines.slice(lineNumbers[0][i], lineNumbers[1][i]));
      meas.meta.adsorptionT = mean(meas.data.sampleT);
      meas.meta.adsorptionTUnit = '°C';
      analysis.pushSpectrum({
        x: {
          data: meas.data.pp0,
          label: 'relative pressure',
          type: 'independent'
        },
        p: {
          data: meas.data.pressure,
          label: 'Pressure  [kPa]',
          type: 'independent'
        },
        y: {
          data: meas.data.excessAdsorption,
          label: 'Excess Adsorption [mmol/g]',
          type: 'dependent'
        },
        r: {
          data: meas.data.excessAdsorptionPercentage,
          label: 'Excess Adsorption [%]',
          type: 'dependent'
        },
        t: {
          data: meas.data.sampleT,
          label: 'Sample Temperature [°C]',
          type: 'independent'
        }
      }, {
        dataType: 'Adsorption Isotherm',
        title: meas.meta.experimentTitle,
        meta: meas.meta
      });
    }

    return analysis;
  }

  function parseMetaBlock(lines, dataStartIndex) {
    let meta = {};

    for (let i = dataStartIndex - 13; i < dataStartIndex; i++) {
      if (lines[i].match('Sample: ')) {
        meta.sample = lineSplit(lines[i])[2].trim();
      }

      if (lines[i].match('Operator:  ')) {
        meta.operator = lineSplit(lines[i])[1].trim();
      }

      if (lines[i].match('Submitter: ')) {
        meta.submitter = lineSplit(lines[i])[1].trim();
      }

      if (lines[i].match('File: ')) {
        meta.file = lineSplit(lines[i])[2].trim();
      }

      if (lines[i].match('Started: ')) {
        meta.started = lineSplit(lines[i])[2].trim();
      }

      if (lines[i].match('Analysis adsorptive: ')) {
        meta.adsorptive = lineSplit(lines[i])[4].trim();
      }

      if (lines[i].match('Completed: ')) {
        meta.completed = lineSplit(lines[i])[2].trim();
      }

      if (lines[i].match('Equilibration time: ')) {
        let time = lineSplit(lines[i])[4].trim().split(' ');
        meta.equilibrationTime = parseFloat(time[0]);
        meta.equilibrationTimeUnit = time[1];
      }

      if (lines[i].match('Report time: ')) {
        meta.reportTime = lineSplit(lines[i])[2].trim();
      }

      if (lines[i].match('Sample mass: ')) {
        let mass = lineSplit(lines[i])[2].trim().split(' ');
        meta.sampleWeight = parseFloat(mass[0]);
        meta.sampleWeightUnit = mass[1];
      }

      if (lines[i].match('Gemini model: ')) {
        meta.model = lineSplit(lines[i])[4].trim();
      }

      if (lines[i].match('Sample density: ')) {
        let density = lineSplit(lines[i])[3].split(' ');
        meta.sampleDensity = parseFloat(density[0]);
        meta.sampleDensityUnit = density[1];
      }

      if (lines[i].match('Evac. rate:  ')) {
        let evacRate = lineSplit(lines[i])[2].split(' ');
        meta.evacRate = parseFloat(evacRate[0]);
        meta.evacRateUnit = evacRate[1];
      }
    }

    return meta;
  }

  function findDataBlocks(lines) {
    let isothermTableStarts = [];
    let isothermTableEnds = [];
    let isIsothermTable = false;

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].match('Isotherm Tabular Report')) {
        isIsothermTable = true;
        isothermTableStarts.push(i);
      }

      if (isIsothermTable && lines[i].match('Micromeritics')) {
        isothermTableEnds.push(i);
        isIsothermTable = false;
      }
    }

    return [isothermTableStarts, isothermTableEnds];
  }

  function parseIsothermTable(lines) {
    let pSat = parseFloat(lines[5].trim() * 0.13332); // convert mmHg to kPa

    let data = {
      x: [],
      y: [],
      p: []
    };
    data.pSat = pSat;
    let parts;

    for (let i = 6; i < lines.length; i++) {
      parts = lineSplit(lines[i]);
      data.x.push(parseFloat(parts[0]));
      data.y.push(parseFloat(parts[2]));
      data.p.push(parseFloat(parts[1]) * 0.13332); // convert mmHg to kPa
    }

    return data;
  }

  function fromMicrometricsTXT(text) {
    const lines = text.split(/\r?\n/).filter(line => !line.match(/^\s*$/));
    let startsAndEnds = findDataBlocks(lines);
    let analysis = new Analysis();
    let data;
    let type = 'Adsorption Isotherm';

    for (let i = 0; i < startsAndEnds[0].length; i++) {
      data = parseIsothermTable(lines.slice(startsAndEnds[0][i], startsAndEnds[1][i]));
      let meta = parseMetaBlock(lines, startsAndEnds[0][i]);
      meta.pSat = data.pSat;

      if (data.x[1] > data.x[data.x.length - 1]) {
        type = 'Desorption Isotherm';
      }

      analysis.pushSpectrum({
        x: {
          data: data.x,
          label: 'relative pressure',
          type: 'independent'
        },
        y: {
          data: data.y,
          label: 'Excess Adsorption [mmol/g]',
          type: 'dependent'
        },
        p: {
          data: data.p,
          label: 'Pressure [kPa]',
          type: 'independent'
        }
      }, {
        dataType: type,
        title: meta.sample,
        meta: meta
      });
    }

    return analysis;
  }

  var papaparse_min = createCommonjsModule(function (module, exports) {
    /* @license
    Papa Parse
    v5.2.0
    https://github.com/mholt/PapaParse
    License: MIT
    */
    !function (e, t) {
        module.exports = t() ;
    }(commonjsGlobal, function s() {

      var f = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== f ? f : {};
      var n = !f.document && !!f.postMessage,
          o = n && /blob:/i.test((f.location || {}).protocol),
          a = {},
          h = 0,
          b = {
        parse: function (e, t) {
          var i = (t = t || {}).dynamicTyping || !1;
          U(i) && (t.dynamicTypingFunction = i, i = {});

          if (t.dynamicTyping = i, t.transform = !!U(t.transform) && t.transform, t.worker && b.WORKERS_SUPPORTED) {
            var r = function () {
              if (!b.WORKERS_SUPPORTED) return !1;
              var e = (i = f.URL || f.webkitURL || null, r = s.toString(), b.BLOB_URL || (b.BLOB_URL = i.createObjectURL(new Blob(["(", r, ")();"], {
                type: "text/javascript"
              })))),
                  t = new f.Worker(e);
              var i, r;
              return t.onmessage = _, t.id = h++, a[t.id] = t;
            }();

            return r.userStep = t.step, r.userChunk = t.chunk, r.userComplete = t.complete, r.userError = t.error, t.step = U(t.step), t.chunk = U(t.chunk), t.complete = U(t.complete), t.error = U(t.error), delete t.worker, void r.postMessage({
              input: e,
              config: t,
              workerId: r.id
            });
          }

          var n = null;
          "string" == typeof e ? n = t.download ? new l(t) : new p(t) : !0 === e.readable && U(e.read) && U(e.on) ? n = new g(t) : (f.File && e instanceof File || e instanceof Object) && (n = new c(t));
          return n.stream(e);
        },
        unparse: function (e, t) {
          var n = !1,
              _ = !0,
              m = ",",
              v = "\r\n",
              s = '"',
              a = s + s,
              i = !1,
              r = null;

          !function () {
            if ("object" != typeof t) return;
            "string" != typeof t.delimiter || b.BAD_DELIMITERS.filter(function (e) {
              return -1 !== t.delimiter.indexOf(e);
            }).length || (m = t.delimiter);
            ("boolean" == typeof t.quotes || "function" == typeof t.quotes || Array.isArray(t.quotes)) && (n = t.quotes);
            "boolean" != typeof t.skipEmptyLines && "string" != typeof t.skipEmptyLines || (i = t.skipEmptyLines);
            "string" == typeof t.newline && (v = t.newline);
            "string" == typeof t.quoteChar && (s = t.quoteChar);
            "boolean" == typeof t.header && (_ = t.header);

            if (Array.isArray(t.columns)) {
              if (0 === t.columns.length) throw new Error("Option columns is empty");
              r = t.columns;
            }

            void 0 !== t.escapeChar && (a = t.escapeChar + s);
          }();
          var o = new RegExp(q(s), "g");
          "string" == typeof e && (e = JSON.parse(e));

          if (Array.isArray(e)) {
            if (!e.length || Array.isArray(e[0])) return u(null, e, i);
            if ("object" == typeof e[0]) return u(r || h(e[0]), e, i);
          } else if ("object" == typeof e) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), Array.isArray(e.data) && (e.fields || (e.fields = e.meta && e.meta.fields), e.fields || (e.fields = Array.isArray(e.data[0]) ? e.fields : h(e.data[0])), Array.isArray(e.data[0]) || "object" == typeof e.data[0] || (e.data = [e.data])), u(e.fields || [], e.data || [], i);

          throw new Error("Unable to serialize unrecognized input");

          function h(e) {
            if ("object" != typeof e) return [];
            var t = [];

            for (var i in e) t.push(i);

            return t;
          }

          function u(e, t, i) {
            var r = "";
            "string" == typeof e && (e = JSON.parse(e)), "string" == typeof t && (t = JSON.parse(t));
            var n = Array.isArray(e) && 0 < e.length,
                s = !Array.isArray(t[0]);

            if (n && _) {
              for (var a = 0; a < e.length; a++) 0 < a && (r += m), r += y(e[a], a);

              0 < t.length && (r += v);
            }

            for (var o = 0; o < t.length; o++) {
              var h = n ? e.length : t[o].length,
                  u = !1,
                  f = n ? 0 === Object.keys(t[o]).length : 0 === t[o].length;

              if (i && !n && (u = "greedy" === i ? "" === t[o].join("").trim() : 1 === t[o].length && 0 === t[o][0].length), "greedy" === i && n) {
                for (var d = [], l = 0; l < h; l++) {
                  var c = s ? e[l] : l;
                  d.push(t[o][c]);
                }

                u = "" === d.join("").trim();
              }

              if (!u) {
                for (var p = 0; p < h; p++) {
                  0 < p && !f && (r += m);
                  var g = n && s ? e[p] : p;
                  r += y(t[o][g], p);
                }

                o < t.length - 1 && (!i || 0 < h && !f) && (r += v);
              }
            }

            return r;
          }

          function y(e, t) {
            if (null == e) return "";
            if (e.constructor === Date) return JSON.stringify(e).slice(1, 25);

            var i = e.toString().replace(o, a),
                r = "boolean" == typeof n && n || "function" == typeof n && n(e, t) || Array.isArray(n) && n[t] || function (e, t) {
              for (var i = 0; i < t.length; i++) if (-1 < e.indexOf(t[i])) return !0;

              return !1;
            }(i, b.BAD_DELIMITERS) || -1 < i.indexOf(m) || " " === i.charAt(0) || " " === i.charAt(i.length - 1);

            return r ? s + i + s : i;
          }
        }
      };

      if (b.RECORD_SEP = String.fromCharCode(30), b.UNIT_SEP = String.fromCharCode(31), b.BYTE_ORDER_MARK = "\ufeff", b.BAD_DELIMITERS = ["\r", "\n", '"', b.BYTE_ORDER_MARK], b.WORKERS_SUPPORTED = !n && !!f.Worker, b.NODE_STREAM_INPUT = 1, b.LocalChunkSize = 10485760, b.RemoteChunkSize = 5242880, b.DefaultDelimiter = ",", b.Parser = w, b.ParserHandle = i, b.NetworkStreamer = l, b.FileStreamer = c, b.StringStreamer = p, b.ReadableStreamStreamer = g, f.jQuery) {
        var d = f.jQuery;

        d.fn.parse = function (o) {
          var i = o.config || {},
              h = [];
          return this.each(function (e) {
            if (!("INPUT" === d(this).prop("tagName").toUpperCase() && "file" === d(this).attr("type").toLowerCase() && f.FileReader) || !this.files || 0 === this.files.length) return !0;

            for (var t = 0; t < this.files.length; t++) h.push({
              file: this.files[t],
              inputElem: this,
              instanceConfig: d.extend({}, i)
            });
          }), e(), this;

          function e() {
            if (0 !== h.length) {
              var e,
                  t,
                  i,
                  r,
                  n = h[0];

              if (U(o.before)) {
                var s = o.before(n.file, n.inputElem);

                if ("object" == typeof s) {
                  if ("abort" === s.action) return e = "AbortError", t = n.file, i = n.inputElem, r = s.reason, void (U(o.error) && o.error({
                    name: e
                  }, t, i, r));
                  if ("skip" === s.action) return void u();
                  "object" == typeof s.config && (n.instanceConfig = d.extend(n.instanceConfig, s.config));
                } else if ("skip" === s) return void u();
              }

              var a = n.instanceConfig.complete;
              n.instanceConfig.complete = function (e) {
                U(a) && a(e, n.file, n.inputElem), u();
              }, b.parse(n.file, n.instanceConfig);
            } else U(o.complete) && o.complete();
          }

          function u() {
            h.splice(0, 1), e();
          }
        };
      }

      function u(e) {
        this._handle = null, this._finished = !1, this._completed = !1, this._halted = !1, this._input = null, this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
          data: [],
          errors: [],
          meta: {}
        }, function (e) {
          var t = E(e);
          t.chunkSize = parseInt(t.chunkSize), e.step || e.chunk || (t.chunkSize = null);
          this._handle = new i(t), (this._handle.streamer = this)._config = t;
        }.call(this, e), this.parseChunk = function (e, t) {
          if (this.isFirstChunk && U(this._config.beforeFirstChunk)) {
            var i = this._config.beforeFirstChunk(e);

            void 0 !== i && (e = i);
          }

          this.isFirstChunk = !1, this._halted = !1;
          var r = this._partialLine + e;
          this._partialLine = "";

          var n = this._handle.parse(r, this._baseIndex, !this._finished);

          if (!this._handle.paused() && !this._handle.aborted()) {
            var s = n.meta.cursor;
            this._finished || (this._partialLine = r.substring(s - this._baseIndex), this._baseIndex = s), n && n.data && (this._rowCount += n.data.length);
            var a = this._finished || this._config.preview && this._rowCount >= this._config.preview;
            if (o) f.postMessage({
              results: n,
              workerId: b.WORKER_ID,
              finished: a
            });else if (U(this._config.chunk) && !t) {
              if (this._config.chunk(n, this._handle), this._handle.paused() || this._handle.aborted()) return void (this._halted = !0);
              n = void 0, this._completeResults = void 0;
            }
            return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n.data), this._completeResults.errors = this._completeResults.errors.concat(n.errors), this._completeResults.meta = n.meta), this._completed || !a || !U(this._config.complete) || n && n.meta.aborted || (this._config.complete(this._completeResults, this._input), this._completed = !0), a || n && n.meta.paused || this._nextChunk(), n;
          }

          this._halted = !0;
        }, this._sendError = function (e) {
          U(this._config.error) ? this._config.error(e) : o && this._config.error && f.postMessage({
            workerId: b.WORKER_ID,
            error: e,
            finished: !1
          });
        };
      }

      function l(e) {
        var r;
        (e = e || {}).chunkSize || (e.chunkSize = b.RemoteChunkSize), u.call(this, e), this._nextChunk = n ? function () {
          this._readChunk(), this._chunkLoaded();
        } : function () {
          this._readChunk();
        }, this.stream = function (e) {
          this._input = e, this._nextChunk();
        }, this._readChunk = function () {
          if (this._finished) this._chunkLoaded();else {
            if (r = new XMLHttpRequest(), this._config.withCredentials && (r.withCredentials = this._config.withCredentials), n || (r.onload = y(this._chunkLoaded, this), r.onerror = y(this._chunkError, this)), r.open(this._config.downloadRequestBody ? "POST" : "GET", this._input, !n), this._config.downloadRequestHeaders) {
              var e = this._config.downloadRequestHeaders;

              for (var t in e) r.setRequestHeader(t, e[t]);
            }

            if (this._config.chunkSize) {
              var i = this._start + this._config.chunkSize - 1;
              r.setRequestHeader("Range", "bytes=" + this._start + "-" + i);
            }

            try {
              r.send(this._config.downloadRequestBody);
            } catch (e) {
              this._chunkError(e.message);
            }

            n && 0 === r.status && this._chunkError();
          }
        }, this._chunkLoaded = function () {
          4 === r.readyState && (r.status < 200 || 400 <= r.status ? this._chunkError() : (this._start += this._config.chunkSize ? this._config.chunkSize : r.responseText.length, this._finished = !this._config.chunkSize || this._start >= function (e) {
            var t = e.getResponseHeader("Content-Range");
            if (null === t) return -1;
            return parseInt(t.substring(t.lastIndexOf("/") + 1));
          }(r), this.parseChunk(r.responseText)));
        }, this._chunkError = function (e) {
          var t = r.statusText || e;

          this._sendError(new Error(t));
        };
      }

      function c(e) {
        var r, n;
        (e = e || {}).chunkSize || (e.chunkSize = b.LocalChunkSize), u.call(this, e);
        var s = "undefined" != typeof FileReader;
        this.stream = function (e) {
          this._input = e, n = e.slice || e.webkitSlice || e.mozSlice, s ? ((r = new FileReader()).onload = y(this._chunkLoaded, this), r.onerror = y(this._chunkError, this)) : r = new FileReaderSync(), this._nextChunk();
        }, this._nextChunk = function () {
          this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
        }, this._readChunk = function () {
          var e = this._input;

          if (this._config.chunkSize) {
            var t = Math.min(this._start + this._config.chunkSize, this._input.size);
            e = n.call(e, this._start, t);
          }

          var i = r.readAsText(e, this._config.encoding);
          s || this._chunkLoaded({
            target: {
              result: i
            }
          });
        }, this._chunkLoaded = function (e) {
          this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, this.parseChunk(e.target.result);
        }, this._chunkError = function () {
          this._sendError(r.error);
        };
      }

      function p(e) {
        var i;
        u.call(this, e = e || {}), this.stream = function (e) {
          return i = e, this._nextChunk();
        }, this._nextChunk = function () {
          if (!this._finished) {
            var e,
                t = this._config.chunkSize;
            return t ? (e = i.substring(0, t), i = i.substring(t)) : (e = i, i = ""), this._finished = !i, this.parseChunk(e);
          }
        };
      }

      function g(e) {
        u.call(this, e = e || {});
        var t = [],
            i = !0,
            r = !1;
        this.pause = function () {
          u.prototype.pause.apply(this, arguments), this._input.pause();
        }, this.resume = function () {
          u.prototype.resume.apply(this, arguments), this._input.resume();
        }, this.stream = function (e) {
          this._input = e, this._input.on("data", this._streamData), this._input.on("end", this._streamEnd), this._input.on("error", this._streamError);
        }, this._checkIsFinished = function () {
          r && 1 === t.length && (this._finished = !0);
        }, this._nextChunk = function () {
          this._checkIsFinished(), t.length ? this.parseChunk(t.shift()) : i = !0;
        }, this._streamData = y(function (e) {
          try {
            t.push("string" == typeof e ? e : e.toString(this._config.encoding)), i && (i = !1, this._checkIsFinished(), this.parseChunk(t.shift()));
          } catch (e) {
            this._streamError(e);
          }
        }, this), this._streamError = y(function (e) {
          this._streamCleanUp(), this._sendError(e);
        }, this), this._streamEnd = y(function () {
          this._streamCleanUp(), r = !0, this._streamData("");
        }, this), this._streamCleanUp = y(function () {
          this._input.removeListener("data", this._streamData), this._input.removeListener("end", this._streamEnd), this._input.removeListener("error", this._streamError);
        }, this);
      }

      function i(m) {
        var a,
            o,
            h,
            r = Math.pow(2, 53),
            n = -r,
            s = /^\s*-?(\d+\.?|\.\d+|\d+\.\d+)(e[-+]?\d+)?\s*$/,
            u = /(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))/,
            t = this,
            i = 0,
            f = 0,
            d = !1,
            e = !1,
            l = [],
            c = {
          data: [],
          errors: [],
          meta: {}
        };

        if (U(m.step)) {
          var p = m.step;

          m.step = function (e) {
            if (c = e, _()) g();else {
              if (g(), 0 === c.data.length) return;
              i += e.data.length, m.preview && i > m.preview ? o.abort() : (c.data = c.data[0], p(c, t));
            }
          };
        }

        function v(e) {
          return "greedy" === m.skipEmptyLines ? "" === e.join("").trim() : 1 === e.length && 0 === e[0].length;
        }

        function g() {
          if (c && h && (k("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + b.DefaultDelimiter + "'"), h = !1), m.skipEmptyLines) for (var e = 0; e < c.data.length; e++) v(c.data[e]) && c.data.splice(e--, 1);
          return _() && function () {
            if (!c) return;

            function e(e) {
              U(m.transformHeader) && (e = m.transformHeader(e)), l.push(e);
            }

            if (Array.isArray(c.data[0])) {
              for (var t = 0; _() && t < c.data.length; t++) c.data[t].forEach(e);

              c.data.splice(0, 1);
            } else c.data.forEach(e);
          }(), function () {
            if (!c || !m.header && !m.dynamicTyping && !m.transform) return c;

            function e(e, t) {
              var i,
                  r = m.header ? {} : [];

              for (i = 0; i < e.length; i++) {
                var n = i,
                    s = e[i];
                m.header && (n = i >= l.length ? "__parsed_extra" : l[i]), m.transform && (s = m.transform(s, n)), s = y(n, s), "__parsed_extra" === n ? (r[n] = r[n] || [], r[n].push(s)) : r[n] = s;
              }

              return m.header && (i > l.length ? k("FieldMismatch", "TooManyFields", "Too many fields: expected " + l.length + " fields but parsed " + i, f + t) : i < l.length && k("FieldMismatch", "TooFewFields", "Too few fields: expected " + l.length + " fields but parsed " + i, f + t)), r;
            }

            var t = 1;
            !c.data.length || Array.isArray(c.data[0]) ? (c.data = c.data.map(e), t = c.data.length) : c.data = e(c.data, 0);
            m.header && c.meta && (c.meta.fields = l);
            return f += t, c;
          }();
        }

        function _() {
          return m.header && 0 === l.length;
        }

        function y(e, t) {
          return i = e, m.dynamicTypingFunction && void 0 === m.dynamicTyping[i] && (m.dynamicTyping[i] = m.dynamicTypingFunction(i)), !0 === (m.dynamicTyping[i] || m.dynamicTyping) ? "true" === t || "TRUE" === t || "false" !== t && "FALSE" !== t && (function (e) {
            if (s.test(e)) {
              var t = parseFloat(e);
              if (n < t && t < r) return !0;
            }

            return !1;
          }(t) ? parseFloat(t) : u.test(t) ? new Date(t) : "" === t ? null : t) : t;
          var i;
        }

        function k(e, t, i, r) {
          var n = {
            type: e,
            code: t,
            message: i
          };
          void 0 !== r && (n.row = r), c.errors.push(n);
        }

        this.parse = function (e, t, i) {
          var r = m.quoteChar || '"';
          if (m.newline || (m.newline = function (e, t) {
            e = e.substring(0, 1048576);
            var i = new RegExp(q(t) + "([^]*?)" + q(t), "gm"),
                r = (e = e.replace(i, "")).split("\r"),
                n = e.split("\n"),
                s = 1 < n.length && n[0].length < r[0].length;
            if (1 === r.length || s) return "\n";

            for (var a = 0, o = 0; o < r.length; o++) "\n" === r[o][0] && a++;

            return a >= r.length / 2 ? "\r\n" : "\r";
          }(e, r)), h = !1, m.delimiter) U(m.delimiter) && (m.delimiter = m.delimiter(e), c.meta.delimiter = m.delimiter);else {
            var n = function (e, t, i, r, n) {
              var s, a, o, h;
              n = n || [",", "\t", "|", ";", b.RECORD_SEP, b.UNIT_SEP];

              for (var u = 0; u < n.length; u++) {
                var f = n[u],
                    d = 0,
                    l = 0,
                    c = 0;
                o = void 0;

                for (var p = new w({
                  comments: r,
                  delimiter: f,
                  newline: t,
                  preview: 10
                }).parse(e), g = 0; g < p.data.length; g++) if (i && v(p.data[g])) c++;else {
                  var _ = p.data[g].length;
                  l += _, void 0 !== o ? 0 < _ && (d += Math.abs(_ - o), o = _) : o = _;
                }

                0 < p.data.length && (l /= p.data.length - c), (void 0 === a || d <= a) && (void 0 === h || h < l) && 1.99 < l && (a = d, s = f, h = l);
              }

              return {
                successful: !!(m.delimiter = s),
                bestDelimiter: s
              };
            }(e, m.newline, m.skipEmptyLines, m.comments, m.delimitersToGuess);

            n.successful ? m.delimiter = n.bestDelimiter : (h = !0, m.delimiter = b.DefaultDelimiter), c.meta.delimiter = m.delimiter;
          }
          var s = E(m);
          return m.preview && m.header && s.preview++, a = e, o = new w(s), c = o.parse(a, t, i), g(), d ? {
            meta: {
              paused: !0
            }
          } : c || {
            meta: {
              paused: !1
            }
          };
        }, this.paused = function () {
          return d;
        }, this.pause = function () {
          d = !0, o.abort(), a = U(m.chunk) ? "" : a.substring(o.getCharIndex());
        }, this.resume = function () {
          t.streamer._halted ? (d = !1, t.streamer.parseChunk(a, !0)) : setTimeout(t.resume, 3);
        }, this.aborted = function () {
          return e;
        }, this.abort = function () {
          e = !0, o.abort(), c.meta.aborted = !0, U(m.complete) && m.complete(c), a = "";
        };
      }

      function q(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }

      function w(e) {
        var O,
            D = (e = e || {}).delimiter,
            I = e.newline,
            T = e.comments,
            A = e.step,
            L = e.preview,
            F = e.fastMode,
            z = O = void 0 === e.quoteChar ? '"' : e.quoteChar;
        if (void 0 !== e.escapeChar && (z = e.escapeChar), ("string" != typeof D || -1 < b.BAD_DELIMITERS.indexOf(D)) && (D = ","), T === D) throw new Error("Comment character same as delimiter");
        !0 === T ? T = "#" : ("string" != typeof T || -1 < b.BAD_DELIMITERS.indexOf(T)) && (T = !1), "\n" !== I && "\r" !== I && "\r\n" !== I && (I = "\n");
        var M = 0,
            j = !1;
        this.parse = function (a, t, i) {
          if ("string" != typeof a) throw new Error("Input must be a string");
          var r = a.length,
              e = D.length,
              n = I.length,
              s = T.length,
              o = U(A),
              h = [],
              u = [],
              f = [],
              d = M = 0;
          if (!a) return R();

          if (F || !1 !== F && -1 === a.indexOf(O)) {
            for (var l = a.split(I), c = 0; c < l.length; c++) {
              if (f = l[c], M += f.length, c !== l.length - 1) M += I.length;else if (i) return R();

              if (!T || f.substring(0, s) !== T) {
                if (o) {
                  if (h = [], b(f.split(D)), S(), j) return R();
                } else b(f.split(D));

                if (L && L <= c) return h = h.slice(0, L), R(!0);
              }
            }

            return R();
          }

          for (var p = a.indexOf(D, M), g = a.indexOf(I, M), _ = new RegExp(q(z) + q(O), "g"), m = a.indexOf(O, M);;) if (a[M] !== O) {
            if (T && 0 === f.length && a.substring(M, M + s) === T) {
              if (-1 === g) return R();
              M = g + n, g = a.indexOf(I, M), p = a.indexOf(D, M);
            } else {
              if (-1 !== p && (p < g || -1 === g)) {
                if (!(p < m)) {
                  f.push(a.substring(M, p)), M = p + e, p = a.indexOf(D, M);
                  continue;
                }

                var v = x(p, m, g);

                if (v && void 0 !== v.nextDelim) {
                  p = v.nextDelim, m = v.quoteSearch, f.push(a.substring(M, p)), M = p + e, p = a.indexOf(D, M);
                  continue;
                }
              }

              if (-1 === g) break;
              if (f.push(a.substring(M, g)), C(g + n), o && (S(), j)) return R();
              if (L && h.length >= L) return R(!0);
            }
          } else for (m = M, M++;;) {
            if (-1 === (m = a.indexOf(O, m + 1))) return i || u.push({
              type: "Quotes",
              code: "MissingQuotes",
              message: "Quoted field unterminated",
              row: h.length,
              index: M
            }), E();
            if (m === r - 1) return E(a.substring(M, m).replace(_, O));

            if (O !== z || a[m + 1] !== z) {
              if (O === z || 0 === m || a[m - 1] !== z) {
                -1 !== p && p < m + 1 && (p = a.indexOf(D, m + 1)), -1 !== g && g < m + 1 && (g = a.indexOf(I, m + 1));
                var y = w(-1 === g ? p : Math.min(p, g));

                if (a[m + 1 + y] === D) {
                  f.push(a.substring(M, m).replace(_, O)), a[M = m + 1 + y + e] !== O && (m = a.indexOf(O, M)), p = a.indexOf(D, M), g = a.indexOf(I, M);
                  break;
                }

                var k = w(g);

                if (a.substring(m + 1 + k, m + 1 + k + n) === I) {
                  if (f.push(a.substring(M, m).replace(_, O)), C(m + 1 + k + n), p = a.indexOf(D, M), m = a.indexOf(O, M), o && (S(), j)) return R();
                  if (L && h.length >= L) return R(!0);
                  break;
                }

                u.push({
                  type: "Quotes",
                  code: "InvalidQuotes",
                  message: "Trailing quote on quoted field is malformed",
                  row: h.length,
                  index: M
                }), m++;
              }
            } else m++;
          }

          return E();

          function b(e) {
            h.push(e), d = M;
          }

          function w(e) {
            var t = 0;

            if (-1 !== e) {
              var i = a.substring(m + 1, e);
              i && "" === i.trim() && (t = i.length);
            }

            return t;
          }

          function E(e) {
            return i || (void 0 === e && (e = a.substring(M)), f.push(e), M = r, b(f), o && S()), R();
          }

          function C(e) {
            M = e, b(f), f = [], g = a.indexOf(I, M);
          }

          function R(e) {
            return {
              data: h,
              errors: u,
              meta: {
                delimiter: D,
                linebreak: I,
                aborted: j,
                truncated: !!e,
                cursor: d + (t || 0)
              }
            };
          }

          function S() {
            A(R()), h = [], u = [];
          }

          function x(e, t, i) {
            var r = {
              nextDelim: void 0,
              quoteSearch: void 0
            },
                n = a.indexOf(O, t + 1);

            if (t < e && e < n && (n < i || -1 === i)) {
              var s = a.indexOf(D, n);
              if (-1 === s) return r;
              n < s && (n = a.indexOf(O, n + 1)), r = x(s, n, i);
            } else r = {
              nextDelim: e,
              quoteSearch: t
            };

            return r;
          }
        }, this.abort = function () {
          j = !0;
        }, this.getCharIndex = function () {
          return M;
        };
      }

      function _(e) {
        var t = e.data,
            i = a[t.workerId],
            r = !1;
        if (t.error) i.userError(t.error, t.file);else if (t.results && t.results.data) {
          var n = {
            abort: function () {
              r = !0, m(t.workerId, {
                data: [],
                errors: [],
                meta: {
                  aborted: !0
                }
              });
            },
            pause: v,
            resume: v
          };

          if (U(i.userStep)) {
            for (var s = 0; s < t.results.data.length && (i.userStep({
              data: t.results.data[s],
              errors: t.results.errors,
              meta: t.results.meta
            }, n), !r); s++);

            delete t.results;
          } else U(i.userChunk) && (i.userChunk(t.results, n, t.file), delete t.results);
        }
        t.finished && !r && m(t.workerId, t.results);
      }

      function m(e, t) {
        var i = a[e];
        U(i.userComplete) && i.userComplete(t), i.terminate(), delete a[e];
      }

      function v() {
        throw new Error("Not implemented.");
      }

      function E(e) {
        if ("object" != typeof e || null === e) return e;
        var t = Array.isArray(e) ? [] : {};

        for (var i in e) t[i] = E(e[i]);

        return t;
      }

      function y(e, t) {
        return function () {
          e.apply(t, arguments);
        };
      }

      function U(e) {
        return "function" == typeof e;
      }

      return o && (f.onmessage = function (e) {
        var t = e.data;
        void 0 === b.WORKER_ID && t && (b.WORKER_ID = t.workerId);
        if ("string" == typeof t.input) f.postMessage({
          workerId: b.WORKER_ID,
          results: b.parse(t.input, t.config),
          finished: !0
        });else if (f.File && t.input instanceof File || t.input instanceof Object) {
          var i = b.parse(t.input, t.config);
          i && f.postMessage({
            workerId: b.WORKER_ID,
            results: i,
            finished: !0
          });
        }
      }), (l.prototype = Object.create(u.prototype)).constructor = l, (c.prototype = Object.create(u.prototype)).constructor = c, (p.prototype = Object.create(p.prototype)).constructor = p, (g.prototype = Object.create(u.prototype)).constructor = g, b;
    });
  });

  const idealGasConstant = 22.413969545014; // mol / cm3 at STP

  function fromMicrometricsCSV(text) {
    text = text.replace(/,/g, '.');
    let parsed = papaparse_min.parse(text, {
      delimiter: ';',
      dynamicTyping: false,
      skipEmptyLines: true
    }).data;

    const arrayColumn = (arr, n) => arr.map(x => x[n]);

    const headerRow = parsed.shift();
    let analyses = [];
    let analysis = new Analysis();
    analysis.pushSpectrum({
      x: {
        data: arrayColumn(parsed, 0).filter(function (value) {
          return value !== '';
        }).map(function (x) {
          return parseFloat(x);
        }),
        label: 'relative pressure p/p0'
      },
      y: {
        data: arrayColumn(parsed, 1).filter(function (value) {
          return value !== '';
        }).map(function (x) {
          return parseFloat(x) / idealGasConstant * 1000;
        }),
        label: 'Excess adsorption mmol /g'
      }
    }, {
      dataType: 'Adsorption Isotherm',
      title: 'Adsorption',
      meta: {
        header: headerRow
      }
    });
    analyses.push(analysis);
    let desorption = new Analysis();
    desorption.pushSpectrum({
      x: {
        data: arrayColumn(parsed, 2).filter(function (value) {
          return value !== '';
        }).map(function (x) {
          return parseFloat(x);
        }),
        label: 'relative pressure p/p0',
        type: 'independent'
      },
      y: {
        data: arrayColumn(parsed, 3).filter(function (value) {
          return value !== '';
        }).map(function (x) {
          return parseFloat(x) / idealGasConstant * 1000;
        }),
        label: 'Excess adsorption mmol /g',
        type: 'dependent'
      }
    }, {
      dataType: 'Desorption Isotherm',
      title: 'Desorption',
      meta: {}
    });
    analyses.push(desorption);
    return analyses;
  }

  const {
    readFile,
    utils: {
      encode_cell
    }
  } = require('xlsx');

  function valueElseUndefined(cell) {
    return cell ? cell.v : undefined;
  }

  function valueElseUndefinedFloat(cell) {
    return cell ? parseFloat(cell.v) : undefined;
  }

  function valueElseUndefinedInt(cell) {
    return cell ? parseFloat(cell.v) : undefined;
  }

  function valueElseUndefinedStripUnit(cell) {
    let val = cell ? cell.v : undefined;
    return val.replace(']', '').replace('[', '');
  }

  function getAdsDesMeta(adsDesSheet) {
    let metaData = {};
    metaData.fileName = valueElseUndefined(adsDesSheet.C2);
    metaData.date = valueElseUndefined(adsDesSheet.C3);
    metaData.time = valueElseUndefined(adsDesSheet.C4);
    metaData.comment1 = valueElseUndefined(adsDesSheet.C5);
    metaData.comment2 = valueElseUndefined(adsDesSheet.C6);
    metaData.comment3 = valueElseUndefined(adsDesSheet.C7);
    metaData.comment4 = valueElseUndefined(adsDesSheet.C8);
    metaData.serialNumber = valueElseUndefined(adsDesSheet.C9);
    metaData.version = valueElseUndefined(adsDesSheet.C10);
    metaData.sampleWeight = valueElseUndefinedFloat(adsDesSheet.C12);
    metaData.sampleWeightUnit = valueElseUndefinedStripUnit(adsDesSheet.D12);
    metaData.standardVolume = valueElseUndefinedFloat(adsDesSheet.C13);
    metaData.standardVolumeUnit = valueElseUndefinedStripUnit(adsDesSheet.D13);
    metaData.deadVolume = valueElseUndefinedFloat(adsDesSheet.C14);
    metaData.deadVolumeUnit = valueElseUndefinedStripUnit(adsDesSheet.D14);
    metaData.equilibriumTime = valueElseUndefinedFloat(adsDesSheet.C15);
    metaData.equilibriumTimeUnit = valueElseUndefinedStripUnit(adsDesSheet.D15);
    metaData.adsorptive = valueElseUndefined(adsDesSheet.C16);
    metaData.apparatusT = valueElseUndefined(adsDesSheet.C17);
    metaData.apparatusTUnit = valueElseUndefinedStripUnit(adsDesSheet.D17);
    metaData.adsorptionT = valueElseUndefinedFloat(adsDesSheet.C18);
    metaData.adsorptionTUnit = valueElseUndefinedStripUnit(adsDesSheet.D18);
    metaData.saturatedVaporPressure = valueElseUndefinedFloat(adsDesSheet.H12);
    metaData.saturatedVaporPressureUnit = valueElseUndefinedStripUnit(adsDesSheet.I12);
    metaData.adsorptionCrossSectionArea = valueElseUndefinedFloat(adsDesSheet.H13);
    metaData.adsorptionCrossSectionAreaUnit = valueElseUndefinedStripUnit(adsDesSheet.I13);
    metaData.adsorptionPoints = valueElseUndefinedInt(adsDesSheet.H17);
    metaData.desorptionPoints = valueElseUndefinedInt(adsDesSheet.H18);
    return metaData;
  }

  function parseIsothermBlock(worksheet, range) {
    let data = {
      pi: [],
      pe: [],
      pe2: [],
      p0: [],
      pp0: [],
      va: []
    };
    const adresses = [data.pi, data.pe, data.pe2, data.p0, data.pp0, data.va];

    for (let R = range.s.r; R <= range.e.r; ++R) {
      let counter = 0;

      for (let C = range.s.c; C <= range.e.c; ++C) {
        let cellAddress = {
          c: C,
          r: R
        };
        let cellRef = encode_cell(cellAddress);
        adresses[counter].push(valueElseUndefinedFloat(worksheet[cellRef]));
        counter++;
      }
    }

    data.va = data.va.map(function (x) {
      return x / idealGasConstant * 1000;
    });
    return data;
  }

  function parseAdsDesData(worksheet, adsorptionPoints, desorptionPoints) {
    // traverse the sheet
    const rangeAds = {
      s: {
        c: 1,
        r: 22
      },
      e: {
        c: 6,
        r: 22 + adsorptionPoints - 1
      }
    };
    const rangeDes = {
      s: {
        c: 1,
        r: 22 + adsorptionPoints + 1
      },
      e: {
        c: 6,
        r: 22 + adsorptionPoints + desorptionPoints
      }
    };
    const adsData = parseIsothermBlock(worksheet, rangeAds);
    const desData = parseIsothermBlock(worksheet, rangeDes);
    return {
      adsorption: adsData,
      desorption: desData
    };
  }

  function fromBelsorp(path) {
    const workbook = readFile(path);
    const adsDesSheet = workbook.Sheets.AdsDes;
    let metaData = getAdsDesMeta(adsDesSheet);
    let data = parseAdsDesData(adsDesSheet, metaData.adsorptionPoints, metaData.desorptionPoints);
    let analysis = new Analysis();
    analysis.pushSpectrum({
      x: {
        data: data.adsorption.pp0,
        label: 'relative pressure',
        type: 'independent'
      },
      p: {
        data: data.adsorption.pe,
        label: 'Pressure  [kPa]',
        type: 'independent'
      },
      y: {
        data: data.adsorption.va,
        label: 'Excess adsorption mmol /g',
        type: 'dependent'
      }
    }, {
      dataType: 'Adsorption Isotherm',
      title: metaData.comment1,
      meta: metaData
    });
    analysis.pushSpectrum({
      x: {
        data: data.desorption.pp0,
        label: 'relative pressure'
      },
      p: {
        data: data.desorption.pe,
        label: 'Pressure  [kPa]'
      },
      y: {
        data: data.desorption.va,
        label: 'Excess adsorption mmol /g'
      }
    }, {
      dataType: 'Desorption Isotherm',
      title: metaData.comment1,
      meta: metaData
    });
    return analysis;
  }

  exports.AnalysesManager = AnalysesManager;
  exports.Analysis = Analysis;
  exports.fromBelsorp = fromBelsorp;
  exports.fromIGA = fromIGA;
  exports.fromJcamp = fromJcamp;
  exports.fromMicrometricsCSV = fromMicrometricsCSV;
  exports.fromMicrometricsTXT = fromMicrometricsTXT;
  exports.getJSGraph = getJSGraph;
  exports.getNormalizationAnnotations = getNormalizationAnnotations;
  exports.toJcamp = toJcamp;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=isotherm-analysis.js.map