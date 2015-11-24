'use strict';
/**
 * Utility class for measuring elapsed time for performance testing. Performace
 * is measured natively as microtime which can be converted to milliseconds or
 * seconds. This is meant to be thin and minimal fo measuring execution times
 * delegated by the user of this module.
 * @module node-metrics
 * @author Tom Pennetta <tpennetta@gmail.com>
 * @example
 * //Measure and track a particular metric
 * var myMetrics = require('metric');
 * var guid = myMetrics.start();
 * //... perform tasks over time ...
 * var elapsed = myMetrics.stop(guid);
 * //elapsed now equals the time in microseconds of tasks performed.
 */

var uuid = require('uuid');
var microtime = require('microtime');
var _ = require('underscore');

/**
 * object collection of metric measurements with property keys of guids and
 * property values of type object containing relevant information.
 * @typedef {Object} Metrics~metrics
 * @property {string} guid - Unique identifier key for metric measurement.
 * @property {integer} guid.startTime - Initial time measurement in microseconds.
 * @property {integer} guid.endTime - End time measurement in microseconds.
 * @property {integer} guid.elapsedTime - Elapsed time measurement in microseconds.
 * @private
 */
var metrics = {};

/**
 * create a new metric to add to metrics object. If passed no guid, a valid
 * v4 uuid is generated.
 * @param  {string}   guid     optional guid string to identify metric.
 * @param  {Function} callback optional standard node callback function.
 * @return {string}            guid identifier for current metric measurement.
 */
function start(guid, callback) {
  var err = null;

  if (arguments.length === 1 && typeof arguments[0] === 'function') {
    guid = uuid.v4();
    callback = arguments[0];
  }

  try {
    guid = guid || uuid.v4();
    metrics[guid] = {
      startTime: microtime.now(),
      endTime: null,
      elapsedTime: null
    };
  } catch(ex) {
    err = ex;
  }

  if (typeof callback === 'function') {
    callback(err, guid);
  } else {
    if(err) throw err;
    return guid;
  }
}

/**
 *
 * @param  {string}   guid     [description]
 * @param  {Function} callback [description]
 * @return {integer}            [description]
 */
function stop(guid, callback) {
  var err = null;
  try {
    isValidGuid(guid);
    metrics[guid].endTime = microtime.now();
    metrics[guid].elapsedTime = metrics[guid].endTime - metrics[guid].startTime;
  } catch(ex) {
    err = ex;
  }

  if (typeof callback === 'function') {
    if(err) {
      callback(err, null);
    } else {
      getElapsedTime(guid, callback);
    }
  } else {
    if(err) throw err;
    return getElapsedTime(guid);
  }
}

/**
 * return all the added/registered metric measurements.
 * @param  {Function} callback optional node callback.
 * @return {Object}            Object literal representation of all metrics.
 */
function getAllMetrics(callback) {
  if (typeof callback === 'function') {
    callback(null, metrics);
  } else {
    return metrics;
  }
}

function getElapsedTime(guid, callback) {
  var err = null;

  try {
    isValidGuid(guid);
  } catch(ex) {
    err = ex;
  }

  if (typeof callback === 'function') {
    callback(err, metrics[guid].elapsedTime);
  } else {
    if(err) throw err;
    return metrics[guid].elapsedTime;;
  }
}

function getAverage() {
  var sum = 0, numElems = 0;
  for(var guid in metrics) {
    if(!metrics.hasOwnProperty(guid)) {
      continue;
    }
    sum += metrics[guid].elapsedTime;
    numElems++;
  }
  sum = sum / numElems;
  return sum;
}

function getMedian() {

}

/**
 * Removes one or all metrics in collection.
 * @param  {string}   guid     optional guid of metric measurement to delete.
 * @param  {Function} callback optional NodeJS callback function.
 * @return {Boolean}           truth if success, false otherwise.
 */
function clear(guid, callback) {
  var err = null;

  if (arguments.length === 1 && typeof arguments[0] === 'function') {
    guid = null;
    callback = arguments[0];
  }

  guid = guid || null;

  try {
    if (guid) {
      isValidGuid(guid);
      delete metrics[guid];
    } else {
      metrics = {};
    }
  } catch(ex) {
    if(typeof callback === 'function') {
      callback(ex, null);
    } else {
      throw ex;
    }
  }

  if (typeof callback === 'function') {
    callback(null, true);
  } else {
    return true;
  }
}

/**
 * Validate guid is not falsey and exists in the metrics collection.
 * @param  {string}  guid guid to validate
 * @return {Boolean}      true if valid and found, false otherwise
 * @private
 */
function isValidGuid(guid) {
  if (!guid) {
    throw new TypeError('GUID cannot be null or undefined');
  }
  if (!metrics[guid]) {
    throw new Error('No metric registered for GUID: ' + guid);
  }
  return true;
}

module.exports = {
  start: start,
  stop: stop,
  clear: clear,
  getElapsedTime: getElapsedTime,
  getAllMetrics: getAllMetrics,
  getAverage: getAverage
};
