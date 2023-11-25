const adminController = {
  getLoginPage: (req, res) => {
    return res.render('admin/login')
  },
  getSpotsPage: (req, res) => {
    return res.render('admin/spots')
  }
}

module.exports = adminController
