const R = require('ramda')
const deepMap = require('./tools').deepMap
const lambdaTokenizer = require('./lambdaTokenizer')
const combinators = require('./constants').combinators

module.exports = deepMap(x => R.compose(
  lambdaTokenizer,
  R.prop(x)
)(combinators))
