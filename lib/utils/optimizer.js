const R = require('ramda')

module.exports = expression => Array.isArray(expression)
  ? R.equals(1, R.length(expression))
    ? expression
    : [expression.reduce(betaReduce)]
  : [expression]

const betaReduce = require('./betaReduce')
