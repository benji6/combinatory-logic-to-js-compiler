const R = require('ramda')
const recursiveContains = require('./tools').recursiveContains
const recursiveMap = require('./tools').recursiveMap

const bodyLens = R.lensProp('body')
const paramsLens = R.lensProp('params')
const overParams = R.over(paramsLens)
const overBody = R.over(bodyLens)
const setBody = R.set(bodyLens)
const decrementBody = overBody(recursiveMap(R.dec))
const viewParams = R.view(paramsLens)
const viewBody = R.view(bodyLens)
const decrementParams = overParams(R.compose(R.map(R.dec), R.tail))
const deepReplace = R.curry((oldVal, newVal, vals) => recursiveMap(R.ifElse(
  R.equals(oldVal),
  R.always(newVal),
  R.identity
), vals))
const typeEquals = R.curry((type, x) => R.compose(R.equals(type), R.type)(x))
const maybeUnnest = R.ifElse(R.both(
  R.compose(R.equals(1), R.length),
  R.compose(R.either(typeEquals('Array'), typeEquals('Object')), R.head)
), R.head, R.identity)
const arity = R.compose(R.length, viewParams)

const betaReduce = R.curry((f, g) => {
  if (R.equals(1, R.length(viewParams(f)))) {
    return maybeUnnest(deepReplace(R.head(viewParams(f)), g, viewBody(f)))
  }
  if (!recursiveContains(1, viewBody(f))) {
    return decrementBody(decrementParams(f))
  }
  if (R.not(typeEquals('Object', g))) {
    return overBody(deepReplace(0, g), decrementBody(decrementParams(f)))
  }
  if (R.equals([1], viewBody(f))) {
    return setBody(
      recursiveMap(R.add(R.dec(arity(f))), viewBody(g)),
      overParams(R.compose(R.range(1), R.add(arity(g)), R.length), f)
    )
  }
  if (R.equals(1, R.head(viewBody(f)))) {
    return overBody(
      body => body.reduce(betaReduce),
      overBody(deepReplace(0, g), decrementBody(decrementParams(f)))
    )
  }
  return f
})

module.exports = betaReduce
