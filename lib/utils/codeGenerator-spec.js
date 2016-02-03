const test = require('tape')
const codeGenerator = require('./codeGenerator')

test('codeGenerator', t => {
  t.equal(
    codeGenerator({arity: 2, body: [1]}),
    'a => b => a'
  )
  t.equal(
    codeGenerator({arity: 3, body: [1, 3, [2, [3]]]}),
    'a => b => c => a(c)(b(c))'
  )
  t.equal(
    codeGenerator({arity: 5, body: [3, 5, [4, 5], 2, [1, 2]]}),
    'a => b => c => d => e => c(e)(d(e))(b)(a(b))'
  )
  t.end()
})
