const { Spot, Category } = require('../models')
const { imgurFileHandler } = require('../helpers/file-helpers')

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
      const categoryId = Number(req.query.categoryId) || ''
      const [categories, spots, category] = await Promise.all([
        Category.findAll({ raw: true }),
        Spot.findAll({
          raw: true,
          nest: true,
          include: [Category],
          where: {
            ...categoryId ? { categoryId } : {}
          }
        }),
        Category.findByPk(categoryId, { raw: true })
      ])
      return res.render('admin/spots', { categories, spots, category })
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
      const { file } = req
      const filePath = await imgurFileHandler(file)

      await Spot.create({
        name,
        tel,
        address,
        opening_hours: openingHours,
        closed_hours: closedHours,
        description,
        categoryId,
        image: filePath || null
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
      const { file } = req
      const filePath = await imgurFileHandler(file)

      await Spot.update({
        name,
        tel,
        address,
        opening_hours: openingHours,
        closed_hours: closedHours,
        description,
        categoryId,
        image: filePath || spot.image
      }, {
        where: {
          id: spot.id
        }
      })
      req.flash('success_msg', '成功修改景點資料！')
      return res.redirect(`/admin/spots/${req.params.id}`)
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
  },
  getSpot: async (req, res, next) => {
    try {
      const spot = await Spot.findByPk(req.params.id, {
        raw: true,
        nest: true,
        include: [Category]
      })
      if (!spot) throw new Error('景點資料不存在！')
      return res.render('admin/spot', { spot })
    } catch (err) {
      next(err)
    }
  },
  getCategoriesPage: async (req, res, next) => {
    try {
      const [categories, category] = await Promise.all([
        Category.findAll({ raw: true }),
        Category.findByPk(req.params.id, { raw: true })
      ])

      return res.render('admin/categories', { categories, category })
    } catch (err) {
      next(err)
    }
  },
  postCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      if (!name) throw new Error('請輸入類別資料！')
      await Category.create({ name })
      req.flash('success_msg', '成功新增一筆類別！')
      res.redirect('/admin/categories')
    } catch (err) {
      next(err)
    }
  },
  putCategory: async (req, res, next) => {
    try {
      const { name } = req.body
      const category = await Category.findByPk(req.params.id)
      if (!category) throw new Error('查無類別資料！')
      if (!name) throw new Error('欄位不得為空！')
      await Category.update({ name }, { where: { id: req.params.id } })
      req.flash('success_msg', '成功修改一筆類別！')
      res.redirect('/admin/categories')
    } catch (err) {
      next(err)
    }
  },
  deleteCategory: async (req, res, next) => {
    try {
      const category = await Category.findByPk(req.params.id)
      if (!category) throw new Error('查無類別資料！')
      await category.destroy()
      req.flash('success_msg', '成功刪除類別！')
      res.redirect('/admin/categories')
    } catch (err) {
      next(err)
    }
  }
}

module.exports = adminController
