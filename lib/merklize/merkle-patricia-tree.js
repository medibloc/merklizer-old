'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merklePatriciaTree = require('merkle-patricia-tree');

var _merklePatriciaTree2 = _interopRequireDefault(_merklePatriciaTree);

var _utils = require('../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var trie = new _merklePatriciaTree2.default(null);

var putObj = function putObj(item, next) {
  var key = item.key,
      value = item.value;


  trie.put(key, value, function (e) {
    return next(e);
  });
};

var createTrie = function createTrie(items, next) {
  _utils2.default.callRecursive(putObj, items, function (e) {
    return next(e, trie);
  });
};

// const putItem = (key, value, next) => {
//   trie.put(key, value, e => next(e));
// };
//
//
// const getItem = (key, next) => {
//   trie.get(key, (e, r) => next(e, r));
// };

var proveItem = function proveItem(item, next) {
  var key = item.key;


  _merklePatriciaTree2.default.prove(trie, key, function (e, r) {
    if (e) return next(e, item);
    return _merklePatriciaTree2.default.verifyProof(trie.root, key, r, function (err2) {
      if (err2) {
        return next(err2, item);
      }
      return next(null, item);
    });
  });
};

var proveTrie = function proveTrie(trie1, items, next) {
  _utils2.default.callRecursive(proveItem, items, function (e) {
    return next(e, trie1);
  });
};

// const prove = (trie, key, next) => {
//   Trie.prove(trie, key, (e, r) => next(e, r));
// };
//
// const verifyProof = (trie, key, proof, next) => {
//   Trie.verifyProof(trie.root, key, proof, (e, r) => next(e, r));
// };

exports.default = {
  createTrie: createTrie,
  proveTrie: proveTrie
  // putItem,
  // getItem,
  // prove,
  // verifyProof,
};