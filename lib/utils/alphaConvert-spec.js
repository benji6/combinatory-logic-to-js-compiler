const test = require('tape')
const alphaConvert = require('./alphaConvert')

test('alphaConvert', t => {
  t.deepEqual(
    alphaConvert(
      3,
      {params: [1], body: [1]}
    ),
    {params: [1], body: [1]}
  )
  t.deepEqual(
    alphaConvert(
      2,
      {params: [1, 2, 3], body: [1, 2]}
    ),
    {params: [1, 4, 3], body: [1, 4]}
  )
  t.deepEqual(
    alphaConvert(
      2,
      {params: [2], body: [1, {params: [2], body: [1]}]}
    ),
    {params: [3], body: [1, {params: [3], body: [1]}]}
  )
  t.end()
})
