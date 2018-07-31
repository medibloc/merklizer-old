import flatten from 'flat';

const flat = obj => flatten(obj);

// const objectToArray = (obj) => Object.entries(obj).map(([key,value]) => ({key,value}));
const objectToArray = obj => Object.entries(obj)
  .map(([key, value]) => ({ key, value }))
  .filter(p => !(Object.keys(p.value).length === 0 && p.value.constructor === Object));

const callRecursive = (func, obj, next) => {
  const json = Object.values(obj);

  func(json.shift(), (e, r) => {
    if (json.length === 0) {
      return next(e, r);
    }
    return callRecursive(func, json, next);
  });
};

export default {
  flat,
  objectToArray,
  callRecursive,
};
