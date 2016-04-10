const test = require('tape')
const lambdaTokenizer = require('./lambdaTokenizer')

test('lambdaTokenizer', t => {
  t.deepEqual(lambdaTokenizer('a => b => a'), {
    arity: 2,
    body: 1
  })
  t.deepEqual(lambdaTokenizer('a => b => c => a(c)(b(c))'), {
    arity: 3,
    body: [1, [3], [2, [3]]]
  })
  t.end()
})
