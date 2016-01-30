const R = require('ramda')

const mapChars = R.map(char => {
  if (char === '(') return '['
  if (char === ')') return '],'
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
