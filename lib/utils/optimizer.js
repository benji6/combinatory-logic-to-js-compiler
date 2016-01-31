const R = require('ramda')
const apply = require('./apply')

module.exports = expression => {
  if (R.equals(1, R.length(expression))) return expression
  return [expression.reduce(apply)]
}
