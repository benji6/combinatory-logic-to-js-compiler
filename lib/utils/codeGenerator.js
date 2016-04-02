const R = require('ramda')
const arrow = require('./constants').arrow
const aCharCode = require('./constants').aCharCode
const parentheses = require('./constants').parentheses
const recursiveMap = require('./tools').recursiveMap
const reduceIndexed = require('./tools').reduceIndexed

const paramCodeToChar = R.compose(
  String.fromCharCode,
  R.add(aCharCode)
)

const params = R.compose(
  R.reduce((x, acc) => x + acc + arrow, ''),
  R.map(paramCodeToChar),
  R.range(0),
  R.length,
  R.prop('params')
)

const reduceFn = reduceIndexed((acc, x, i) => acc + (Array.isArray(x)
  ? parentheses[0] + reduceFn(x) + parentheses[1]
  : i
    ? parentheses[0] + x + parentheses[1]
    : x), '')

const body = R.compose(
  reduceFn,
  recursiveMap(R.compose(paramCodeToChar, R.dec)),
  R.prop('body')
)

module.exports = lambdaToken => params(R.head(lambdaToken)) + body(R.head(lambdaToken))
