const R = require('ramda')
const expressionParser = require('./expressionParser')
const arrow = require('./constants').arrow

const getFnParams = str => R.split(arrow, R.slice(0, str.lastIndexOf(arrow), str))
const getFnBody = str => str.slice(str.lastIndexOf(arrow) + 4, str.length)

module.exports = lambdaExpr => {
  const params = getFnParams(lambdaExpr)
  const body = getFnBody(lambdaExpr)
  return {
    arity: params.length,
    body: R.compose(
      expressionParser,
      R.join(''),
      R.map(x => {
        const i = R.indexOf(x, params)
        return i === -1 ? x : i + 1
      })
    )(body)
  }
}
