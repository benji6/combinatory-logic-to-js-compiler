const R = require('ramda')
const deepContains = require('./tools').deepContains
const deepMap = require('./tools').deepMap

const bodyLens = R.lensProp('body')
const arityLens = R.lensProp('arity')
const decrementBody = R.over(bodyLens, deepMap(R.dec))
const viewBody = R.view(bodyLens)
const decrementArity = R.over(arityLens, R.dec)

module.exports = R.curry((f, g) => {
  if (!deepContains(1, f.body)) return decrementBody(decrementArity(f))
  if (f.body[0] === 1) {
    return {
      arity: f.arity - 1 + g.arity,
      body: R.concat(deepMap(R.add(f.arity - 1), g.body), R.tail(viewBody(decrementBody(f))))
    }
  }
})
