const test = require('tape')
const parser = require('./parser')

test('parser', t => {
  t.deepEqual(parser('K'), {
    params: [1, 2],
    body: [1]
  })
  t.deepEqual(parser('SKK'), [
    {
      params: [1, 2, 3],
      body: [1, 3, [2, 3]]
    },
    {
      params: [1, 2],
      body: [1]
    },
    {
      params: [1, 2],
      body: [1]
    }
  ])
  t.deepEqual(parser('S(KS)K'), [
    {
      params: [1, 2, 3],
      body: [1, 3, [2, 3]]
    },
    [
      {
        params: [1, 2],
        body: [1]
      },
      {
        params: [1, 2, 3],
        body: [1, 3, [2, 3]]
      }
    ],
    {
      params: [1, 2],
      body: [1]
    }
  ])
  t.end()
})
