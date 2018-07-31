import Trie from 'merkle-patricia-tree';
// import levelup from 'levelup';
import utils from '../utils';

// const db = levelup('./leveldb');
// let trie = new Trie(db);
const trie = new Trie(null);

// const createTrie = async (items) => {
//   // let trie = utils.callRecursive(putItem, items);
//   // let trie = null;
//   utils.callRecursive(putItem, items).then(e => {
//     console.log('Trie created');
//     return trie;
//   });
// };

const putObj = (item, next) => {
  const { key, value } = item;

  trie.put(key, value, e => next(e));
};

const createTrie = (items, next) => {
  utils.callRecursive(putObj, items, e => next(e, trie));
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


// const getItem = async (key) => {
//   trie.get(key, (e,r) => {
//     if (e) return e;
//     else return null;
//   });
// };

const putItem = (key, value, next) => {
  trie.put(key, value, e => next(e));
};


const getItem = (key, next) => {
  trie.get(key, (e, r) => next(e, r));
};

// const proveTrie = async (trie, items) => {
//   utils.callRecursive(proveItem, items).then(e => {
//     console.log('Trie proved');
//     return null;
//   });
// };

const proveItem = (item, next) => {
  const { key } = item;

  Trie.prove(trie, key, (e, r) => {
    if (e) return next(e, item);
    return Trie.verifyProof(trie.root, key, r, (err2) => {
      if (err2) {
        return next(err2, item);
      }
      return next(null, item);
    });
  });
};

const proveTrie = (trie, items, next) => {
  utils.callRecursive(proveItem, items, e => next(e, trie));
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

const prove = (trie, key, next) => {
  Trie.prove(trie, key, (e, r) => next(e, r));
};

const verifyProof = (trie, key, proof, next) => {
  Trie.verifyProof(trie.root, key, proof, (e, r) => next(e, r));
};

export default {
  createTrie,
  proveTrie,
  getItem,
};
