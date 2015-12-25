const test = require('tape')
const compile = require('./')

const testCompile = (str, res) => test(str, t => (t.equal(compile(str), res), t.end()))

testCompile('S', 'a => b => c => a(c)(b(c))')
testCompile('SS', 'a => b => c => d => e => c(e)(d(e))(b)(a(b))')
testCompile('SSS', 'a => b => c => d => b(d)(c(d))(a)(e => f => a(f)(e(f)))')
testCompile('K', 'a => b => a')
testCompile('KK', 'a => b => c => b')
testCompile('KKK', 'a => b => a')

// testCompile('SSK', 'a => b => c => d => b(d)(c(d))(a)((a => b => a)(a))')
// testCompile('KS', 'a => b => c => d => b(d)(c(d))')
// testCompile('KSS', 'a => b => c => a(c)(b(c))')
