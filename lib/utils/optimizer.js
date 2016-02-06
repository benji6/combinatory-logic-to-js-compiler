const R = require('ramda')
const betaReduce = require('./betaReduce')

module.exports = expression => {
  if (R.equals(1, R.length(expression))) return R.head(expression)
  return expression.reduce(betaReduce)
}
