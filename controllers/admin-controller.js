const adminController = {
  getLoginPage: (req, res) => {
    return res.render('admin/login')
  },
  login: (req, res) => {
    const admin = req.user.toJSON()
    req.flash('success_msg', `Welcome back, ${admin.name}！`)
    return res.redirect('/admin/spots')
  },
  logout: (req, res) => {
    req.logout(() => {
      req.flash('success_msg', 'Logout successfully！')
      return res.redirect('/index')
    })
  },
  getSpotsPage: (req, res) => {
    return res.render('admin/spots')
  }
}

module.exports = adminController
