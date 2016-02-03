const R = require('ramda')
const recursiveMap = require('./tools').recursiveMap
const combinators = require('./constants').combinators

module.exports = recursiveMap(x => R.prop(x, combinators))
