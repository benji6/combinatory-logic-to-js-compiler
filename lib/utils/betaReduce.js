const R = require('ramda')
const recursiveContains = require('./tools').recursiveContains
const recursiveMap = require('./tools').recursiveMap

const bodyLens = R.lensProp('body')
const arityLens = R.lensProp('arity')
const overArity = R.over(arityLens)
const overBody = R.over(bodyLens)
const decrementBody = overBody(recursiveMap(R.dec))
const viewArity = R.view(arityLens)
const viewBody = R.view(bodyLens)
const decrementArity = overArity(R.dec)
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

const betaReduce = R.curry((f, g) => {
  if (R.equals(1, viewArity(f))) {
    return maybeUnnest(deepReplace(1, g, viewBody(f)))
  }
  if (!recursiveContains(1, viewBody(f))) {
    return decrementBody(decrementArity(f))
  }
  if (R.not(typeEquals('Object', g))) {
    return overBody(deepReplace(0, g), decrementBody(decrementArity(f)))
  }
  if (R.equals([1], viewBody(f))) {
    return overBody(
      R.compose(
        R.concat(recursiveMap(R.add(R.dec(viewArity(f))), viewBody(g))),
        R.tail,
        recursiveMap(R.dec)
      ),
      overArity(R.add(R.dec(viewArity(g))), f)
    )
  }
  if (R.equals(1, R.head(viewBody(f)))) {
    return overBody(
      body => body.reduce(betaReduce),
      overBody(deepReplace(0, g), decrementBody(decrementArity(f)))
    )
  }
  return f
})

module.exports = betaReduce
