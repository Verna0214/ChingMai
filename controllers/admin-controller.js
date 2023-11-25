const adminController = {
  getLoginPage: (req, res) => {
    return res.render('admin/login')
  },
  login: (req, res) => {
    return res.redirect('/admin/spots')
  },
  logout: (req, res) => {
    req.logout(() => {
      return res.redirect('/index')
    })
  },
  getSpotsPage: (req, res) => {
    return res.render('admin/spots')
  }
}

module.exports = adminController
