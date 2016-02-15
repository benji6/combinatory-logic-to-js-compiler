const R = require('ramda')

const bodyLens = R.lensProp('body')
const paramsLens = R.lensProp('params')

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

module.exports.isObj = R.compose(R.equals('Object'), R.type)
module.exports.body = R.view(bodyLens)
module.exports.overBody = R.over(bodyLens)
module.exports.setBody = R.set(bodyLens)
module.exports.params = R.view(paramsLens)
module.exports.overParams = R.over(paramsLens)
