const R = require('ramda')
const test = require('tape')
const deepMap = require('./tools').deepMap

test('deepMap', t => {
  t.deepEqual(
    deepMap(R.add(1), [1, [1, 2, 3, [4], []]]),
    [2, [2, 3, 4, [5], []]]
  )
  t.end()
})
