const test = require('tape')
const substitute = require('./substitute')

test('substitute', t => {
  t.deepEqual(
    substitute(
      3,
      3,
      [1]
    ),
    [1]
  )
  t.deepEqual(
    substitute(
      1,
      2,
      [1]
    ),
    [2]
  )
  t.deepEqual(
    substitute(
      1,
      2,
      [1, {params: [1], body: [1]}]
    ),
    [2, {params: [1], body: [1]}]
  )
  t.deepEqual(
    substitute(
      1,
      2,
      [1, {params: [3], body: [1]}]
    ),
    [2, {params: [3], body: [2]}]
  )
  t.deepEqual(
    substitute(
      1,
      2,
      [1, {params: [2], body: [1]}]
    ),
    [2, {params: [3], body: [2]}]
  )
  t.end()
})
