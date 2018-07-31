import protobuf from 'protobufjs';
import fhir from '../../proto/fhir-stu3-google/pbjs.json';

const pbjs = protobuf.Root.fromJSON(fhir);

const filter = (obj) => {
  const Type = pbjs.lookupType(obj.resourceType);
  // console.log('Type: ', Type);
  const err = Type.verify(obj);
  // console.log('err: ', err);
  if (err) throw Error(err);

  const msg = Type.create(obj);
  // console.log('msg: ', msg);
  const buf = Type.encode(msg).finish();
  // console.log('buf: ', buf);
  const msgd = Type.decode(buf);
  // console.log('msgd: ', msgd);
  const plain = Type.toObject(msgd, {
    // enums: String,
    // longs: String,
    // bytes: String,
    // defaults: true,
    // arrays: true,
    // objects: true,
    // oneofs: true
  });
  // console.log('plain stringify: ', JSON.stringify(plain));

  return plain;
};

export default {
  filter,
};
