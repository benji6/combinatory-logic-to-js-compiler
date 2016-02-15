const R = require('ramda')
const body = require('./tools').body
const isObj = require('./tools').isObj
const overBody = require('./tools').overBody
const overParams = require('./tools').overParams
const params = require('./tools').params
const recursiveContains = require('./tools').recursiveContains
const recursiveMap = require('./tools').recursiveMap
const setBody = require('./tools').setBody

const equalsOne = R.equals(1)
const recursiveDec = recursiveMap(R.dec)
const recursiveInc = recursiveMap(R.inc)
const decrementBody = overBody(recursiveDec)
const incrementBody = overBody(recursiveInc)
const reduceParams = overParams(R.compose(R.map(R.dec), R.tail))
const incrementParams = overParams(R.map(R.inc))
const deepReplace = R.curry((oldVal, newVal, vals) => recursiveMap(R.ifElse(
  R.equals(oldVal),
  R.always(newVal),
  R.identity
), vals))
const maybeUnnest = R.ifElse(R.both(
  R.compose(equalsOne, R.length),
  R.compose(R.either(R.isArrayLike, isObj), R.head)
), R.head, R.identity)
const arity = R.compose(R.length, params)

const betaReduce = R.curry((f, g) => {
  if (equalsOne(R.length(params(f)))) {
    return maybeUnnest(deepReplace(R.head(params(f)), g, body(f)))
  }
  if (!recursiveContains(1, body(f))) return decrementBody(reduceParams(f))
  if (R.not(isObj(g))) {
    var newF = decrementBody(reduceParams(f))
    var param = 0
    while (R.contains(g, params(newF))) {
      newF = incrementBody(incrementParams(newF))
      param++
    }
    return overBody(deepReplace(param, g), newF)
  }
  if (R.equals([1], body(f))) {
    return setBody(
      recursiveMap(R.add(R.dec(arity(f))), body(g)),
      overParams(R.compose(R.range(1), R.add(arity(g)), R.length), f)
    )
  }
  if (equalsOne(R.head(body(f)))) {
    return overBody(
      body => body.reduce(betaReduce),
      overBody(deepReplace(0, g), decrementBody(reduceParams(f)))
    )
  }
  return f
})

module.exports = betaReduce
