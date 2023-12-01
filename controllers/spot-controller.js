const { Category, Spot, Comment } = require('../models')

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
      const spotId = req.query.spotId
      if (spotId) {
        const spot = await Spot.findByPk(spotId, {
          include: [Category, { model: Comment }]
        })
        return res.render('spot', { spot: spot.toJSON() })
      }
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
