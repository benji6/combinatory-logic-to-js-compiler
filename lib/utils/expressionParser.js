const R = require('ramda')
const parentheses = require('./constants').parentheses

const mapChars = R.map(char => {
  if (char === parentheses[0]) return '['
  if (char === parentheses[1]) return '],'
  if (/^\d+$/.test(char)) return R.join('', [char, ','])
  return R.join('', ['"', char, '",'])
})

module.exports = R.memoize(R.compose(
  eval,
  R.join(''),
  R.append(']'),
  R.prepend('['),
  mapChars
))
