const R = require('ramda')
const isObj = require('./tools').isObj
const overBody = require('./tools').overBody
const overParams = require('./tools').overParams
const params = require('./tools').params
const recursiveMap = require('./tools').recursiveMap

const ifEqualsIncrementBy = (a, b) => R.ifElse(
  R.equals(a),
  R.add(b),
  R.identity
)

const incAmount = (a, f) => Math.max(...params(f)) - a + 1

const alphaConvert = R.curry((a, f) => R.ifElse(
  R.compose(R.contains(a), params),
  R.compose(
    overBody(recursiveMap(R.ifElse(
      isObj,
      alphaConvert(a),
      ifEqualsIncrementBy(a, incAmount(a, f))
    ))),
    overParams(R.map(ifEqualsIncrementBy(a, incAmount(a, f))))
  ),
  R.identity
)(f))

module.exports = alphaConvert
