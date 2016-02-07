const test = require('tape')
const tokenizer = require('./tokenizer')

test('tokenizer', t => {
  t.deepEqual(tokenizer(['S', ['K']]), [
    {
      params: [1, 2, 3],
      body: [1, 3, [2, 3]]
    },
    [
      {
        params: [1, 2],
        body: [1]
      }
    ]
  ])
  t.end()
})
