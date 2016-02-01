const R = require('ramda')
const test = require('tape')
const deepContains = require('./tools').deepContains
const deepMap = require('./tools').deepMap
const count = require('./tools').count

test('count', t => {
  t.is(count(1, [1, 2, 3, 4, 5]), 1)
  t.is(count(1, [1, 2, 3, 4, 5, 1]), 2)
  t.is(count(2, [1, 2, 3, 4, 5, 2, 2]), 3)
  t.end()
})

test('deepContains', t => {
  t.true(deepContains(1, [1, [1, 2, 3, [4], []]]))
  t.true(deepContains(4, [1, [1, 2, 3, [4], []]]))
  t.false(deepContains(5, [1, [1, 2, 3, [4], []]]))
  t.end()
})

test('deepMap', t => {
  t.deepEqual(
    deepMap(R.add(1), [1, [1, 2, 3, [4], []]]),
    [2, [2, 3, 4, [5], []]]
  )
  t.end()
})
