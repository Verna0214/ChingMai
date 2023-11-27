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
      return res.render('admin/spots', { spots })
    } catch (err) {
      next(err)
    }
  },
  createSpotPage: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })
      return res.render('admin/create', { categories })
    } catch (err) {
      next(err)
    }
  },
  postSpot: async (req, res, next) => {
    try {
      const { name, categoryId, tel, address, openingHours, closedHours, description } = req.body
      if (!name || !categoryId || !tel || !address || !openingHours || !closedHours || !description) throw new Error('欄位請填寫完成！')
      await Spot.create({
        name,
        tel,
        address,
        opening_hours: openingHours,
        closed_hours: closedHours,
        description,
        categoryId
      })
      req.flash('success_msg', '成功新增一筆景點資料！')
      return res.redirect('/admin/spots')
    } catch (err) {
      next(err)
    }
  },
  editSpotPage: async (req, res, next) => {
    try {
      const [spot, categories] = await Promise.all([
        Spot.findByPk(req.params.id, { raw: true }),
        Category.findAll({ raw: true })
      ])
      if (!spot) throw new Error('景點資料不存在！')

      return res.render('admin/edit', { categories, spot })
    } catch (err) {
      next(err)
    }
  },
  putSpot: async (req, res, next) => {
    try {
      const { name, categoryId, tel, address, openingHours, closedHours, description } = req.body
      if (!name || !categoryId || !tel || !address || !openingHours || !closedHours || !description) throw new Error('欄位請填寫完成！')
      const spot = await Spot.findByPk(req.params.id)
      if (!spot) throw new Error('景點資料不存在！')

      await Spot.update({
        name,
        tel,
        address,
        opening_hours: openingHours,
        closed_hours: closedHours,
        description,
        categoryId
      }, {
        where: {
          id: spot.id
        }
      })
      req.flash('success_msg', '成功修改景點資料！')
      return res.redirect('/admin/spots')
    } catch (err) {
      next(err)
    }
  },
  deleteSpot: async (req, res, next) => {
    try {
      const spot = await Spot.findByPk(req.params.id)
      if (!spot) throw new Error('景點資料不存在！')
      await spot.destroy()
      req.flash('success_msg', '成功刪除景點資料！')
      return res.redirect('/admin/spots')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
