const { ensureAuthenticated } = require('../helpers/auth-helpers')

module.exports = {
  authenticated: (req, res, next) => {
    if (ensureAuthenticated(req)) {
      return next()
    }
    res.redirect('/index')
  }
}
