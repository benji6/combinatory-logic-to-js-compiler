const R = require('ramda')
const deepMap = require('./tools').deepMap
const combinators = require('./constants').combinators

module.exports = deepMap(x => R.prop(x, combinators))
