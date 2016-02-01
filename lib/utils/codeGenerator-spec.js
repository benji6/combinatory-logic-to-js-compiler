const test = require('tape')
const codeGenerator = require('./codeGenerator')

test('codeGenerator', t => {
  t.equal(codeGenerator({
    arity: 2,
    body: [1]
  }), 'a => b => a')
  t.equal(codeGenerator({
    arity: 3,
    body: [1, 3, [2, [3]]]
  }), 'a => b => c => a(c)(b(c))')
  t.end()
})
