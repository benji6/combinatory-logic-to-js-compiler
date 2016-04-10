const R = require('ramda')

const bodyLens = R.lensProp('body')
const paramsLens = R.lensProp('params')

const recursiveMap = R.curry((f, xs) => R.map(
  R.ifElse(Array.isArray, recursiveMap(f), f),
  xs
))

const recursiveContains = R.curry((val, xs) => R.reduce((acc, x) => {
  if (x === val) return true
  if (Array.isArray(x)) return acc || recursiveContains(val, x)
  return acc
}, false, xs))

module.exports.body = R.view(bodyLens)
module.exports.isObj = R.compose(R.equals('Object'), R.type)
module.exports.overBody = R.over(bodyLens)
module.exports.overParams = R.over(paramsLens)
module.exports.params = R.view(paramsLens)
module.exports.recursiveMap = recursiveMap
module.exports.recursiveContains = recursiveContains
module.exports.reduceIndexed = R.addIndex(R.reduce)
module.exports.setBody = R.set(bodyLens)
