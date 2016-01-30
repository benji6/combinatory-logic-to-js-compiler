const test = require('tape')
const expressionParser = require('./expressionParser')

test('expressionParser', t => {
  t.deepEqual(expressionParser('K'), ['K'])
  t.deepEqual(expressionParser('S(KS)(K)'), ['S', ['K', 'S'], ['K']])
  t.deepEqual(expressionParser('1(3)(2(3))'), [1, [3], [2, [3]]])
  t.end()
})
