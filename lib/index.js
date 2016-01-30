const R = require('ramda')

const SKDefinitions = {
  S: 'a => b => c => a(c)(b(c))',
  K: 'a => b => a'
}
const arrow = ' => '
const arrayToString = R.join('')
const mapString = R.curry(R.compose(R.join(''), R.map))
const getFnParams = R.memoize(str => R.split(arrow, R.slice(0, str.lastIndexOf(arrow), str)))
const firstParam = R.memoize(R.compose(R.head, getFnParams))
const getFnBody = R.memoize(str => str.slice(str.lastIndexOf(arrow) + 4, str.length))
const offsetChar = R.memoize(R.curry((n, str) => String.fromCharCode(str.charCodeAt(0) + n)))
const offsetAlphaChar = R.memoize(R.curry((n, str) => R.test(/[a-z]/, str)
  ? offsetChar(n)(str)
  : str))
const offsetCharsBody = R.compose(mapString(offsetAlphaChar(-1)), getFnBody)
const paramsAndBodyToFnString = (params, body) => params.length
  ? arrayToString([R.join(arrow, params), arrow, body])
  : body

const apply = (f, g) => {
  const gOffsetChars = mapString(
    getFnParams(f).length === 1
      ? R.identity
      : offsetAlphaChar(getFnParams(f).length - 1),
    g
  )
  const substitutedBody = R.replace(
    offsetAlphaChar(-1, firstParam(f)),
    gOffsetChars,
    offsetCharsBody(f)
  )
  return paramsAndBodyToFnString(
    R.tail(getFnParams(f)).map(offsetChar(-1)),
    getFnBody(g).indexOf(firstParam(f)) === -1
      ? mapString(offsetAlphaChar(-1), substitutedBody)
      : substitutedBody
  )
}

module.exports = R.reduce(
  (acc, val) => apply(acc, SKDefinitions[val]),
  'a => a'
)
