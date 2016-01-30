const R = require('ramda')

module.exports.deepMap = R.curry((f, xs) => R.map(
  R.ifElse(Array.isArray, module.exports.deepMap(f), f),
  xs
))
