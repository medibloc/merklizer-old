import { utils, dicom, fhir, merkle } from '../lib/index';
import fs from 'fs';

// example - condition
const resource_example = './data/example/fhir-stu3/condition-example.json';

fs.readFile(resource_example, 'utf8', (e,r) => {
  if (e) throw e;

  let resource = JSON.parse(r);
  // console.log('read: ', resource);

  var plain = fhir.filter(resource);
  // console.log('plain: ', plain);

  var flat = utils.flat(plain);
  // console.log('flat: ', flat);

  var arr = utils.objectToArray(flat);
  // console.log('array: ', arr);

  merkle.createTrie(arr, (e,r) => {
    var trie = r;

    // merkle.getItem('code.coding.0.display.value', (e,r) => {
    //   console.log('get, ', r);
    // });
    //
    // merkle.prove(trie, 'code.coding.0.display.value', (e,r) => {
    //   console.log('prove, ', r);
    //   merkle.verifyProof(trie, 'code.coding.0.display.value', r, (e,r) => {
    //     console.log('verifyProof, ', r);
    //   });
    // });

    merkle.proveTrie(trie, arr, (e,r) => {
      let trie = r;
    });
  });
});


// example - DICOM => media
const dicom_example = './data/example/temp/ctimage.dcm';

fs.readFile(dicom_example, (e,r) => {
  if (e) throw e;

  let dicomArray = new Uint8Array(r);
  let media = dicom.createMedia(dicomArray);
  // console.log('media: ', media);

  let plain = fhir.filter(media);
  // console.log('plain: ', plain);

  let flat = utils.flat(plain);
  // console.log('flat: ', flat);

  let arr = utils.objectToArray(flat);
  // console.log('array: ', arr);

  merkle.createTrie(arr, (e,r) => {
    let trie = r;

    // merkle.getItem('type.value', (e,r) => {
    //   console.log('get, ', r);
    // });
    //
    // merkle.prove(trie, 'type.value', (e,r) => {
    //   console.log('prove, ', r);
    //   merkle.verifyProof(trie, 'type.value', r, (e,r) => {
    //     console.log('verifyProof, ', r);
    //   });
    // });

    merkle.proveTrie(trie, arr, (e,r) => {
      let trie = r;
    });
  });
});
