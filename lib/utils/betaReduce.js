const R = require('ramda')
const recursiveContains = require('./tools').recursiveContains
const recursiveMap = require('./tools').recursiveMap

const bodyLens = R.lensProp('body')
const arityLens = R.lensProp('arity')
const decrementBody = R.over(bodyLens, recursiveMap(R.dec))
const viewBody = R.view(bodyLens)
const decrementArity = R.over(arityLens, R.dec)

module.exports = R.curry((f, g) => {
  if (!recursiveContains(1, f.body)) return decrementBody(decrementArity(f))
  if (f.body[0] === 1) {
    return {
      arity: f.arity - 1 + g.arity,
      body: R.concat(
        recursiveMap(R.add(f.arity - 1), g.body),
        R.tail(viewBody(decrementBody(f)))
      )
    }
  }
})
