const { Category, Spot } = require('../models')

const spotController = {
  getEntry: (req, res) => {
    return res.render('entry')
  },
  getHomePage: async (req, res, next) => {
    try {
      const categories = await Category.findAll({ raw: true })
      return res.render('index', { categories })
    } catch (err) {
      next(err)
    }
  },
  getSpotsPage: async (req, res, next) => {
    try {
      const [category, spots] = await Promise.all([
        Category.findByPk(req.params.id, { raw: true }),
        Spot.findAll({
          raw: true,
          where: {
            categoryId: req.params.id
          }
        })
      ])

      return res.render('spots', { spots, category })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = spotController
