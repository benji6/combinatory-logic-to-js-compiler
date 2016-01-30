const R = require('ramda')
const tokenizer = require('./utils/tokenizer')
const codeGenerator = require('./utils/codeGenerator')
const expressionParser = require('./utils/expressionParser')
const optimizer = require('./utils/optimizer')

module.exports = R.compose(
  R.join(''),
  R.map(codeGenerator),
  optimizer,
  tokenizer,
  expressionParser
)
