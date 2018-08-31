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
  var buf = Type.encode(msg).finish();
  var msgd = Type.decode(buf);
  var plain = Type.toObject(msgd, {
    // enums: String,
    // longs: String,
    // bytes: String,
    // defaults: true,
    // arrays: true,
    // objects: true,
    // oneofs: true
  });

  return plain;
};

exports.default = {
  filter: filter
};