import protobuf from 'protobufjs';
import fhir from '../../proto/fhir-stu3-google/pbjs.json';

const pbjs = protobuf.Root.fromJSON(fhir);

const filter = (obj) => {
  let Type = pbjs.lookupType(obj.resourceType);
  // console.log('Type: ', Type);
  let err = Type.verify(obj);
  // console.log('err: ', err);
  if (err) throw Error(err);

  let msg = Type.create(obj);
  // console.log('msg: ', msg);
  let buf = Type.encode(msg).finish();
  // console.log('buf: ', buf);
  let msgd = Type.decode(buf);
  // console.log('msgd: ', msgd);
  let plain = Type.toObject(msgd, {
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
  filter
}
