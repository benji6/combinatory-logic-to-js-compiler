const R = require('ramda')
const deepContains = require('./tools').deepContains
const deepMap = require('./tools').deepMap

const bodyLens = R.lensProp('body')
const paramsLens = R.lensProp('params')
const decrementBody = R.over(bodyLens, deepMap(R.dec))
const decrementParams = R.over(paramsLens, R.dec)

module.exports = R.curry((f, g) => {
  if (!deepContains(1, f.body)) {
    return decrementBody(decrementParams(f))
  }
  if (f.body[0] === 1) {
    return {
      params: f.params - 1 + g.params,
      body: deepMap(x => x + f.params - 1, g.body)
    }
  }
})
