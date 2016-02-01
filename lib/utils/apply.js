const R = require('ramda')
const deepContains = require('./tools').deepContains
const deepMap = require('./tools').deepMap

const bodyLens = R.lensProp('body')
const arityLens = R.lensProp('arity')
const decrementBody = R.over(bodyLens, deepMap(R.dec))
const decrementarity = R.over(arityLens, R.dec)

module.exports = R.curry((f, g) => {
  if (!deepContains(1, f.body)) {
    return decrementBody(decrementarity(f))
  }
  if (f.body[0] === 1) {
    return {
      arity: f.arity - 1 + g.arity,
      body: deepMap(x => x + f.arity - 1, g.body)
    }
  }
})
