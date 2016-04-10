const test = require('tape')
const expressionParser = require('./expressionParser')

test('expressionParser', t => {
  t.deepEqual(expressionParser('K'), 'K')
  t.deepEqual(expressionParser('KS'), ['K', 'S'])
  t.deepEqual(expressionParser('S(KS)(K)'), ['S', ['K', 'S'], ['K']])
  t.end()
})
