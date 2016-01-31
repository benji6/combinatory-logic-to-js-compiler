const R = require('ramda')

module.exports.deepMap = R.curry((f, xs) => R.map(
  R.ifElse(Array.isArray, module.exports.deepMap(f), f),
  xs
))

module.exports.deepContains = R.curry((val, xs) => R.reduce((acc, x) => {
  if (x === val) return true
  if (Array.isArray(x)) return acc || module.exports.deepContains(val, x)
  return acc
}, false, xs))
