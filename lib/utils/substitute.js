const R = require('ramda')
const recursiveMap = require('./tools').recursiveMap
const isObj = require('./tools').isObj
const overBody = require('./tools').overBody
const params = require('./tools').params
const alphaConvert = require('./alphaConvert')

const substitute = R.curry((a, b, expression) => recursiveMap(R.cond([
  [R.equals(a), R.always(b)],
  [isObj, R.ifElse(
    R.compose(R.contains(a), params),
    R.identity,
    R.compose(overBody(substitute(a, b)), alphaConvert(b))
  )],
  [R.T, R.identity]
]), expression))

module.exports = substitute
