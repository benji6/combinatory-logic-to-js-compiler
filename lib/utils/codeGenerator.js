const R = require('ramda')
const arrow = require('./constants').arrow
const aCharCode = require('./constants').aCharCode

const paramCodeToChar = R.memoize(R.compose(
  String.fromCharCode,
  R.add(aCharCode)
))

const params = R.memoize(R.compose(
  R.reduce((x, acc) => x + acc + arrow, ''),
  R.map(paramCodeToChar),
  R.range(0),
  R.prop('params')
))

const body = R.memoize(R.compose(
  R.join(''),
  R.init,
  R.tail,
  R.map(char => {
    if (/^\d+$/.test(char)) return paramCodeToChar(char - 1)
    if (char === '[') return '('
    if (char === ']') return ')'
    return char
  }),
  R.reject(R.equals(',')),
  R.split(''),
  JSON.stringify,
  R.prop('body')
))

module.exports = lambdaToken => params(lambdaToken) + body(lambdaToken)
