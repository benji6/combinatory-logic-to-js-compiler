const R = require('ramda')
const test = require('tape')
const recursiveContains = require('./tools').recursiveContains
const recursiveMap = require('./tools').recursiveMap

test('recursiveContains', t => {
  t.true(recursiveContains(1, [1, [1, 2, 3, [4], []]]))
  t.true(recursiveContains(4, [1, [1, 2, 3, [4], []]]))
  t.false(recursiveContains(5, [1, [1, 2, 3, [4], []]]))
  t.end()
})

test('recursiveMap', t => {
  t.deepEqual(
    recursiveMap(R.add(1), [1, [1, 2, 3, [4], []]]),
    [2, [2, 3, 4, [5], []]]
  )
  t.end()
})
