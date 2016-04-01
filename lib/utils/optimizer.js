const R = require('ramda')

module.exports = expression => {
  if (R.equals(1, R.length(expression))) return expression
  return [expression.reduce(betaReduce)]
}

const betaReduce = require('./betaReduce')
