import protobuf from 'protobufjs';
import fhir from '../../proto/fhir-stu3/stu3.json';

const pbjs = protobuf.Root.fromJSON(fhir);

const filter = (obj) => {
  const Type = pbjs.lookupType(obj.resourceType);
  const err = Type.verify(obj);
  if (err) throw Error(err);

  const msg = Type.create(obj);
  const plain = Type.toObject(msg, {
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
        msg.entry.forEach((o, i) => {
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
        msg.parameter.forEach((o, i) => {
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

export default {
  filter,
};
