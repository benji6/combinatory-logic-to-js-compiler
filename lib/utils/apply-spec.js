const test = require('tape')
const apply = require('./apply')

test('apply', t => {
  t.deepEqual(
    apply(
      {params: 2, body: [1]},
      {params: 2, body: [1]}
    ),
    {params: 3, body: [2]}
  )
  t.deepEqual(
    apply(
      {params: 3, body: [2]},
      {params: 2, body: [1]}
    ),
    {params: 2, body: [1]}
  )
  t.end()
})
