import Trie from 'merkle-patricia-tree';
// import levelup from 'levelup';
import utils from '../utils';

// const db = levelup('./leveldb');
// let trie = new Trie(db);
let trie = new Trie(null);

// const createTrie = async (items) => {
//   // let trie = utils.callRecursive(putItem, items);
//   // let trie = null;
//   utils.callRecursive(putItem, items).then(e => {
//     console.log('Trie created');
//     return trie;
//   });
// };

const createTrie = (items, next) => {
  utils.callRecursive(putObj, items, (e,r) => {
    return next(e,trie);
  });
};

// const putItem = async (item) => {
//   let key = item.key;
//   let value = item.value;
//
//   // trie.put(key, value).then(() => {
//   //   trie.get(key).then((e,r) => {
//   //     console.log('get after put: ', r);
//   //     if (e) {
//   //       return e;
//   //     } else {
//   //       return null;
//   //     }
//   //   });
//   // });
//   trie.put(key, value, () => {
//     trie.get(key, (e,r) => {
//       console.log('get after put: ', r);
//       if (e) {
//         return e;
//       } else {
//         return null;
//       }
//     });
//   });
// };

const putObj = (item, next) => {
  let key = item.key;
  let value = item.value;

  trie.put(key, value, (e) => {
    return next(e);
  });
};

// const getItem = async (key) => {
//   trie.get(key, (e,r) => {
//     if (e) return e;
//     else return null;
//   });
// };

const putItem = (key, value, next) => {
  trie.put(key, value, (e) => {
    return next(e);
  });
};


const getItem = (key, next) => {
  trie.get(key, (e,r) => {
    return next(e,r);
  });
};

// const proveTrie = async (trie, items) => {
//   utils.callRecursive(proveItem, items).then(e => {
//     console.log('Trie proved');
//     return null;
//   });
// };

const proveTrie = (trie, items, next) => {
  trie = trie
  utils.callRecursive(proveItem, items, (e,r) => {
    return next(e,trie);
  });
};

// const proveItem = async (item) => {
//   let key = item.key;
//
//   Trie.prove(trie, key, (e,r) => {
//     if (e) return e;
//     Trie.verifyProof(trie.root, key, r, (e,r) => {
//       console.log('prove and verify: ', r);
//       if (e) {
//         return e;
//       } else {
//         return null;
//       }
//     });
//   });
// };

const proveItem = (item, next) => {
  let key = item.key;

  Trie.prove(trie, key, (e,r) => {
    if (e) return next(e, item);
    Trie.verifyProof(trie.root, key, r, (e,r) => {
      if (e) {
        return next(e, item);
      } else {
        return next(null, item);
      }
    });
  });
};

const prove = (trie, key, next) => {
  Trie.prove(trie, key, (e,r) => {
    return next(e,r);
  });
};

const verifyProof = (trie, key, proof, next) => {
  Trie.verifyProof(trie.root, key, proof, (e,r) => {
    return next(e,r);
  });
};

export default {
  createTrie,
  proveTrie,
  getItem
};
