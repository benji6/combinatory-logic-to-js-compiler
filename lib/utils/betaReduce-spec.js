const test = require('tape')
const betaReduce = require('./betaReduce')

test('betaReduce', t => {
  t.deepEqual(
    betaReduce(
      {arity: 2, body: [1]},
      {arity: 2, body: [1]}
    ),
    {arity: 3, body: [2]}
  )
  t.deepEqual(
    betaReduce(
      {arity: 3, body: [2]},
      {arity: 2, body: [1]}
    ),
    {arity: 2, body: [1]}
  )
  t.deepEqual(
    betaReduce(
      {arity: 3, body: [1, 3, [2, 3]]},
      {arity: 3, body: [1, 3, [2, 3]]}
    ),
    {arity: 5, body: [3, 5, [4, 5], 2, [1, 2]]}
  )
  t.end()
})
