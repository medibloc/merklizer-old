'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _protobufjs = require('protobufjs');

var _protobufjs2 = _interopRequireDefault(_protobufjs);

var _stu = require('../../proto/fhir-stu3/stu3.json');

var _stu2 = _interopRequireDefault(_stu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pbjs = _protobufjs2.default.Root.fromJSON(_stu2.default);

var filter = function filter(obj) {
  var Type = pbjs.lookupType(obj.resourceType);
  var err = Type.verify(obj);
  if (err) throw Error(err);

  var msg = Type.create(obj);
  var plain = Type.toObject(msg, {
    // enums: String,
    // longs: String,
    // bytes: String,
    // defaults: true,
    // arrays: true,
    // objects: true,
    // oneofs: true
  });

  switch (obj.resourceType) {
    // Bundle - entry.resource, entry.response.outcome
    // repeated entry
    case 'Bundle':
      if (msg.entry && msg.entry.length > 0) {
        msg.entry.forEach(function (o, i) {
          if (o.resource) {
            plain.entry[i].resource = filter(o.resource);
          }
          if (o.response.outcome) {
            plain.entry[i].response.outcome = filter(o.response.outcome);
          }
        });
      }
      break;
    // Parameters - parameter.resource
    // repeated parameter
    case 'Parameters':
      if (msg.parameter && msg.parameter.length > 0) {
        msg.parameter.forEach(function (o, i) {
          if (o.resource) {
            plain.parameter[i].resource = filter(o.resource);
          }
        });
      }
      break;
    // repeated contained
    default:
      if (msg.contained && msg.contained.length > 0) {
        plain.contained = msg.contained.map(filter);
      }
  }

  return plain;
};

exports.default = {
  filter: filter
};