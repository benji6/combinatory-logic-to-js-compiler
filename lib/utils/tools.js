const R = require('ramda')

module.exports.recursiveMap = R.curry((f, xs) => R.map(
  R.ifElse(Array.isArray, module.exports.recursiveMap(f), f),
  xs
))

module.exports.recursiveContains = R.curry((val, xs) => R.reduce((acc, x) => {
  if (x === val) return true
  if (Array.isArray(x)) return acc || module.exports.recursiveContains(val, x)
  return acc
}, false, xs))

module.exports.reduceIndexed = R.addIndex(R.reduce)
