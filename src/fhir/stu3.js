import protobuf from 'protobufjs';
import fhir from '../../proto/fhir-stu3-google/pbjs.json';

const pbjs = protobuf.Root.fromJSON(fhir);

const filter = (obj) => {
  const Type = pbjs.lookupType(obj.resourceType);
  const err = Type.verify(obj);
  if (err) throw Error(err);

  const msg = Type.create(obj);
  const buf = Type.encode(msg).finish();
  const msgd = Type.decode(buf);
  const plain = Type.toObject(msgd, {
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

export default {
  filter,
};
