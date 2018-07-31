'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _flat = require('flat');

var _flat2 = _interopRequireDefault(_flat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var flat = function flat(obj) {
  return (0, _flat2.default)(obj);
};

// const objectToArray = (obj) => Object.entries(obj).map(([key,value]) => ({key,value}));
var objectToArray = function objectToArray(obj) {
  return Object.entries(obj).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];

    return { key: key, value: value };
  }).filter(function (p) {
    return !(Object.keys(p.value).length === 0 && p.value.constructor === Object);
  });
};

var callRecursive = function callRecursive(func, obj, next) {
  var json = Object.values(obj);

  func(json.shift(), function (e, r) {
    if (json.length === 0) {
      return next(e, r);
    }
    return callRecursive(func, json, next);
  });
};

exports.default = {
  flat: flat,
  objectToArray: objectToArray,
  callRecursive: callRecursive
};