const R = require('ramda')

module.exports = expression => R.equals(1, R.length(expression))
  ? expression
  : [expression.reduce(betaReduce)]

const betaReduce = require('./betaReduce')
