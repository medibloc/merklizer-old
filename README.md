# Merklizer

Merklizer is a javascript package for dealing healthcare data as Merkle-Patricia-Tree.  
Also providing conversion of standard medical data format between each standards.  
(Currently, support DICOM to FHIR only.)

## Dependencies
### [protoc 3.6.0](https://github.com/google/protobuf/tree/v3.6.0)

### npm packages
* [merkle-patricia-tree 2.3.1](https://github.com/ethereumjs/merkle-patricia-tree/tree/v2.3.1)
* [protobufjs 6.8.6](https://github.com/dcodeIO/protobuf.js/tree/6.8.6)
* [dicom-parser 1.8.1](https://github.com/cornerstonejs/dicomParser/tree/1.8.1)


## Usage
### FHIR Resource to Merkle-Patricia-Tree

```node
import { utils, fhir, merkle } from 'merklizer';

// let resource = OBJECT_OF_FHIR_RESOURCE;
let plain = fhir.filter(resource); // returns filtered object
let flat = utils.flat(plain); // returns flatted object
let arr = utils.objectToArray(flat); // returns array
merkle.createTrie(arr, (e,r) => {
  let trie = r;
  merkle.proveTrie(trie, arr, (e,r) => {
    let trie = r;
  }
}
```

### DICOM to Merkle-Patricia-Tree

```node
import { utils, dicom, fhir, merkle } from 'merklizer';

// let dicomArray = UINT8ARRAY_OF_DICOM
let media= dicom.createMedia(dicomArray); // returns media object
let plain = fhir.filter(media); // returns filtered object
let flat = utils.flat(plain); // returns flatted object
let arr = utils.objectToArray(flat); // returns array
merkle.createTrie(arr, (e,r) => {
  let trie = r;
  merkle.proveTrie(trie, arr, (e,r) => {
    let trie = r;
  }
}
```

## Docs

| Components | Descriptions
|------------|-----------------------------------
| fhir | HL7 FHIR related
| dicom | DICOM related
| merkle | merkle-patricia-tree related
| utils | extra functions to deal with object

### fhir.filter
An object is processed as defined [Google's FHIR Protocol Buffers 0.2](https://github.com/google/fhir/tree/v0.2)

#### Parameters
* `object` **[Object]** An JSON typed FHIR Resource
#### Returns
* `object` **[Object]** A filtered FHIR Resource

**Examples**
```javascript
const media = {
  "resourceType":"Media",
  "type": { "value": 1 },
  "content": {
    "data": { "value": "" },
  }
};
let filtered = fhir.filter(media);
```

### dicom.createMedia
Transform dicom to Media resource  

#### Parameters
* `dicomArray` **[Uint8Array]** A Uint8Array typed DICOM
#### Returns
* `media` **[Object]** An Object of Media resource

**Examples**
```javascript
const dicomArray = new Uint8Array(buffer);
let media = dicom.createMedia(dicomArray);
```

### merkle.createTrie
Create trie using an array of resource components

#### Parameters
* `items` **[Array]** An array, which is composed of key and value
* `cb` **[Function]** A callback `Function` (arguments {Error}`e`, {Trie}`r`)

**Examples**
```javascript
merkle.createTrie(items, cb);
```

### merkle.proveTrie
Prove trie using an array of resource components that is used to create the trie

#### Parameters
* `trie` **[Trie]** A trie to prove
* `items` **[Array]** An array, which is composed of key and value
* `cb` **[Function]** A callback `Function` (arguments {Error}`e`, {Trie}`r`)

**Examples**
```javascript
merkle.proveTrie(trie, items, cb);
```

### utils.flat
Flat object's depth

#### Parameters
* `obj` **[Object]** An object, which is composed of key and value
#### Returns
* `flat` **[Object]** An flatten object

**Examples**
```javascript
let obj = {
  key1: {
    keyA: 'valueI'
  },
  key2: {
    keyB: 'valueII'
  },
  key3: { a: { b: { c: 2 } } }
}
let flatted = utils.flat(obj);
```

### utils.objectToArray
Transform object to array

#### Parameters
* `obj` **[Object]** An object
#### Returns
* `arr` **[Array]** An array

**Examples**
```javascript
let obj = {
  {key: "name", value: "Bob"},
  {key: "email", value: "bob@gmail.com"},
};
let array = utils.objectToArray(obj);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[Apache-2.0](http://www.apache.org/licenses/LICENSE-2.0)
