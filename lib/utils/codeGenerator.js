const R = require('ramda')
const arrow = require('./constants').arrow
const aCharCode = require('./constants').aCharCode
const parentheses = require('./constants').parentheses

const paramCodeToChar = R.memoize(R.compose(
  String.fromCharCode,
  R.add(aCharCode)
))

const params = R.memoize(R.compose(
  R.reduce((x, acc) => x + acc + arrow, ''),
  R.map(paramCodeToChar),
  R.range(0),
  R.prop('params')
))

const reduceIndexed = R.addIndex(R.reduce)

const body = R.memoize(R.compose(
  R.join(''),
  R.init,
  R.tail,
  R.prop('list'),
  xs => reduceIndexed((acc, x, i) => {
    const leftBracketSurplus = acc.leftBracketSurplus
    const list = acc.list
    if (leftBracketSurplus && x === parentheses[0]) {
      return {
        leftBracketSurplus: leftBracketSurplus - 1,
        list: R.concat(list, [parentheses[1], x])
      }
    }
    if (leftBracketSurplus && i === R.length(xs) - 1) {
      return {
        leftBracketSurplus: leftBracketSurplus - 1,
        list: R.concat(list, [x, parentheses[1]])
      }
    }
    if (!R.contains(x, parentheses) && !R.contains(R.last(list), parentheses)) {
      return {
        leftBracketSurplus: leftBracketSurplus + 1,
        list: R.concat(list, [parentheses[0], x])
      }
    }
    return {
      leftBracketSurplus,
      list: R.append(x, list)
    }
  }, {leftBracketSurplus: 0, list: []}, xs),
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
