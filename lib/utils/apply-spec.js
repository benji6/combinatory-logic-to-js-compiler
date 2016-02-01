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
  t.deepEqual(
    apply(
      {arity: 3, body: [1, 3, [2, 3]]},
      {arity: 3, body: [1, 3, [2, 3]]}
    ),
    {arity: 5, body: [3, 5, [4, 5], 2, [1, 2]]}
  )
  t.end()
})
