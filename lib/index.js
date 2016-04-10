const R = require('ramda')
const codeGenerator = require('./utils/codeGenerator')
const parser = require('./utils/parser')
const optimizer = require('./utils/optimizer')

module.exports = R.compose(
  codeGenerator,
  optimizer,
  parser
)
