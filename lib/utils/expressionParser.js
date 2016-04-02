const R = require('ramda')
const parentheses = require('./constants').parentheses

const mapChars = R.map(R.cond([
  [R.equals(R.head(parentheses)), R.always('[')],
  [R.equals(R.last(parentheses)), R.always('],')],
  [R.test(/^\d+$/), R.compose(R.join(''), R.flip(R.pair)(','))],
  [R.T, R.compose(R.join(''), R.append('",'), R.pair('"'))]
]))

module.exports = R.compose(
  eval,
  R.join(''),
  R.append(']'),
  R.prepend('['),
  mapChars
)
