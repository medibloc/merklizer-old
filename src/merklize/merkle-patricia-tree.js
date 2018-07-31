import Trie from 'merkle-patricia-tree';
import utils from '../utils';

const trie = new Trie(null);

const putObj = (item, next) => {
  const { key, value } = item;

  trie.put(key, value, e => next(e));
};

const createTrie = (items, next) => {
  utils.callRecursive(putObj, items, e => next(e, trie));
};

// const putItem = (key, value, next) => {
//   trie.put(key, value, e => next(e));
// };
//
//
// const getItem = (key, next) => {
//   trie.get(key, (e, r) => next(e, r));
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

const proveTrie = (trie1, items, next) => {
  utils.callRecursive(proveItem, items, e => next(e, trie1));
};

// const prove = (trie, key, next) => {
//   Trie.prove(trie, key, (e, r) => next(e, r));
// };
//
// const verifyProof = (trie, key, proof, next) => {
//   Trie.verifyProof(trie.root, key, proof, (e, r) => next(e, r));
// };

export default {
  createTrie,
  proveTrie,
  // putItem,
  // getItem,
  // prove,
  // verifyProof,
};
