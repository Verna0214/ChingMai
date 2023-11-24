const adminController = {
  getSpotsPage: (req, res) => {
    return res.render('admin/spots')
  }
}

module.exports = adminController
