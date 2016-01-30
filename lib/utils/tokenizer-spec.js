const test = require('tape')
const tokenizer = require('./tokenizer')

test('lambdaTokenizer', t => {
  t.deepEqual(tokenizer(['S', ['K']]), [
    {
      params: 3,
      body: [1, [3], [2, [3]]]
    },
    [
      {
        params: 2,
        body: [1]
      }
    ]
  ])
  t.end()
})
