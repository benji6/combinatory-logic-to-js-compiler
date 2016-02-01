const R = require('ramda')
const arrow = require('./constants').arrow
const aCharCode = require('./constants').aCharCode
const parentheses = require('./constants').parentheses
const count = require('./tools').count

const paramCodeToChar = R.memoize(R.compose(
  String.fromCharCode,
  R.add(aCharCode)
))

const params = R.memoize(R.compose(
  R.reduce((x, acc) => x + acc + arrow, ''),
  R.map(paramCodeToChar),
  R.range(0),
  R.prop('arity')
))

const body = R.memoize(R.compose(
  R.join(''),
  R.init,
  R.tail,
  R.ifElse(
    xs => count(parentheses[0], xs) > count(parentheses[1], xs),
    R.append(parentheses[1]),
    R.identity
  ),
  R.prop('list'),
  R.reduce((acc, x) => {
    const leftBracketSurplus = acc.leftBracketSurplus
    const list = acc.list
    if (leftBracketSurplus && x === parentheses[0]) {
      return {
        leftBracketSurplus: 0,
        list: R.append(x, R.concat(list, R.repeat(parentheses[1], leftBracketSurplus)))
      }
    }
    if (!R.contains(x, parentheses) && !R.equals(R.last(list), parentheses[0])) {
      return {
        leftBracketSurplus: leftBracketSurplus + 1,
        list: R.append(x, R.append(parentheses[0], list))
      }
    }
    return {leftBracketSurplus, list: R.append(x, list)}
  }, {leftBracketSurplus: 0, list: []}),
  R.map(char => {
    if (/^\d+$/.test(char)) return paramCodeToChar(char - 1)
    if (char === '[') return parentheses[0]
    if (char === ']') return parentheses[1]
    return char
  }),
  R.reject(R.equals(',')),
  R.split(''),
  JSON.stringify,
  R.prop('body')
))

module.exports = lambdaToken => params(lambdaToken) + body(lambdaToken)
