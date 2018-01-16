"use strict";

var _ = require(`lodash`);
var flatten = require(`flat`);
var typeOf = require(`type-of`);

var createKey = require(`./create-key`);

var INVALID_VALUE = Symbol(`INVALID_VALUE`);
var isDefined = function isDefined(v) {
  return v != null;
};

var isSameType = function isSameType(a, b) {
  return a == null || b == null || typeOf(a) === typeOf(b);
};
var areAllSameType = function areAllSameType(list) {
  return list.every(function (current, i) {
    var prev = i ? list[i - 1] : undefined;
    return isSameType(prev, current);
  });
};

var isEmptyObjectOrArray = function isEmptyObjectOrArray(obj) {
  if (obj === INVALID_VALUE) {
    return true;
  } else if (_.isDate(obj)) {
    return false;
    // Simple "is object empty" check.
  } else if (_.isObject(obj) && _.isEmpty(obj)) {
    return true;
  } else if (_.isObject(obj)) {
    return _.every(obj, function (value, key) {
      if (!isDefined(value)) {
        return true;
      } else if (_.isObject(value)) {
        return isEmptyObjectOrArray(value);
      } else {
        return false;
      }
    });
  }
  return false;
};

/**
 * Takes an array of source nodes and returns a pristine
 * example that can be used to infer types.
 *
 * Arrays are flattened to either: `null` for empty or sparse arrays or a
 * an array of a sigle merged example. e.g:
 *
 *  - ['red'], ['blue', 'yellow'] -> ['red']
 *  - [{ color: 'red'}, { color: 'blue', ht: 5 }] -> [{ color: 'red', ht: 5 }]
 *
 * @param {*Nodes} args
 */
var extractFieldExamples = function extractFieldExamples(nodes
// $FlowFixMe
) {
  return _.mergeWith.apply(_, [_.isArray(nodes[0]) ? [] : {}].concat(_.cloneDeep(nodes), [function (obj, next, key, po, pn, stack) {
    if (obj === INVALID_VALUE) return obj;

    // TODO: if you want to support infering Union types this should be handled
    // differently. Maybe merge all like types into examples for each type?
    // e.g. union: [1, { foo: true }, ['brown']] -> Union Int|Object|List
    if (!isSameType(obj, next)) {
      return INVALID_VALUE;
    }

    if (!_.isArray(obj || next)) {
      // Prefer floats over ints as they're more specific.
      if (obj && _.isNumber(obj) && !_.isInteger(obj)) return obj;
      if (obj === null) return next;
      if (next === null) return obj;
      return undefined;
    }

    var array = [].concat(obj, next).filter(isDefined);

    if (!array.length) return null;
    if (!areAllSameType(array)) return INVALID_VALUE;

    // Linked node arrays don't get reduced further as we
    // want to preserve all the linked node types.
    if (_.includes(key, `___NODE`)) {
      return array;
    }

    // primitive values don't get merged further, just take the first item
    if (!_.isObject(array[0])) return array.slice(0, 1);
    var merged = extractFieldExamples(array);
    return isDefined(merged) ? [merged] : null;
  }]));
};

var buildFieldEnumValues = function buildFieldEnumValues(nodes) {
  var enumValues = {};
  var values = flatten(extractFieldExamples(nodes), {
    maxDepth: 3,
    safe: true, // don't flatten arrays.
    delimiter: `___`
  });
  Object.keys(values).forEach(function (field) {
    if (values[field] == null) return;
    enumValues[createKey(field)] = { field };
  });

  return enumValues;
};

// extract a list of field names
// nested objects get flattened to "outer___inner" which will be converted back to
// "outer.inner" by run-sift
var extractFieldNames = function extractFieldNames(nodes) {
  var values = flatten(extractFieldExamples(nodes), {
    maxDepth: 3,
    safe: true, // don't flatten arrays.
    delimiter: `___`
  });

  return Object.keys(values);
};

module.exports = {
  INVALID_VALUE,
  extractFieldExamples,
  buildFieldEnumValues,
  extractFieldNames,
  isEmptyObjectOrArray
};
//# sourceMappingURL=data-tree-utils.js.map