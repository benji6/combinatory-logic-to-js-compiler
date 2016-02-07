const test = require('tape')
const betaReduce = require('./betaReduce')

test('betaReduce - non-lambda argument', t => {
  t.deepEqual(
    betaReduce(
      {params: [1, 2], body: [1]},
      2
    ),
    {params: [1], body: [2]}
  )
  t.deepEqual(
    betaReduce(
      {params: [1], body: [1]},
      1
    ),
    [1]
  )
  t.deepEqual(
    betaReduce(
      {params: [1], body: [1, 1]},
      1
    ),
    [1, 1]
  )
  t.deepEqual(
    betaReduce(
      {params: [1], body: [1]},
      [2, [3]]
    ),
    [2, [3]]
  )
  t.deepEqual(
    betaReduce(
      {params: [1], body: [1, 1]},
      [2, [3]]
    ),
    [[2, [3]], [2, [3]]]
  )
  t.end()
})

test('betaReduce - lambda argument', t => {
  t.deepEqual(
    betaReduce(
      {params: [1], body: [1]},
      {params: [1, 2, 3], body: [1, 3, [2, 3]]}
    ),
    {params: [1, 2, 3], body: [1, 3, [2, 3]]}
  )
  t.deepEqual(
    betaReduce(
      {params: [1, 2], body: [1]},
      {params: [1, 2], body: [1]}
    ),
    {params: [1, 2, 3], body: [2]}
  )
  t.deepEqual(
    betaReduce(
      {params: [1, 2, 3], body: [2]},
      {params: [1, 2], body: [1]}
    ),
    {params: [1, 2], body: [1]}
  )
  t.deepEqual(
    betaReduce(
      {params: [1, 2, 3], body: [1, 3, [2, 3]]},
      {params: [1, 2], body: [1]}
    ),
    {params: [1, 2], body: [2]}
  )
  // t.deepEqual(
  //   betaReduce(
  //     {params: [1, 2, 3], body: [1, 3, [2, 3]]},
  //     {params: [1, 2, 3], body: [1, 3, [2, 3]]}
  //   ),
  //   {params: [1, 2, 3], body: [2, 3, [1, 2, 3]]}
  // )
  t.end()
})
