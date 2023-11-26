const { Spot, Category } = require('../models')

const adminController = {
  getLoginPage: (req, res) => {
    return res.render('admin/login')
  },
  login: (req, res) => {
    const user = req.user.toJSON()
    req.flash('success_msg', `Welcome back, ${user.name}！`)
    return res.redirect('/admin/spots')
  },
  logout: (req, res) => {
    req.logout(() => {
      req.flash('success_msg', 'Logout successfully！')
      return res.redirect('/index')
    })
  },
  getSpotsPage: async (req, res, next) => {
    try {
      const spots = await Spot.findAll({
        raw: true,
        nest: true,
        include: [Category]
      })
      res.render('admin/spots', { spots })
    } catch (err) {
      next(err)
    }
  },
  createSpotPage: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })
      res.render('admin/create', { categories })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
