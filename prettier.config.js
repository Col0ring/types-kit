const __PROD__ = process.env.NODE_ENV === 'production'
const prettierConfig = require('@col0ring/prettier-config')(__PROD__)

module.exports = {
  ...prettierConfig,
}
