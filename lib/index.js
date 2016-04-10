const R = require('ramda')
const codeGenerator = require('./utils/codeGenerator')
const parser = require('./utils/parser')
const transformer = require('./utils/transformer')

module.exports = R.compose(
  codeGenerator,
  transformer,
  parser
)
