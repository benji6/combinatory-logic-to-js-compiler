const test = require('tape')
const apply = require('./apply')

test('apply', t => {
  t.deepEqual(
    apply(
      {arity: 2, body: [1]},
      {arity: 2, body: [1]}
    ),
    {arity: 3, body: [2]}
  )
  t.deepEqual(
    apply(
      {arity: 3, body: [2]},
      {arity: 2, body: [1]}
    ),
    {arity: 2, body: [1]}
  )
  t.end()
})
