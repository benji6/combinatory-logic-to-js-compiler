const R = require('ramda')
const combinators = require('./constants').combinators
const parentheses = require('./constants').parentheses
const recursiveMap = require('./tools').recursiveMap

const mapChars = R.map(R.cond([
  [R.equals(R.head(parentheses)), R.always('[')],
  [R.equals(R.last(parentheses)), R.always('],')],
  [R.T, R.compose(R.join(''), R.append('",'), R.pair('"'))]
]))

module.exports = R.compose(
  R.ifElse(R.compose(R.equals(1), R.length), R.head, R.identity),
  recursiveMap(R.flip(R.prop)(combinators)),
  eval,
  R.join(''),
  R.append(']'),
  R.prepend('['),
  mapChars
)
