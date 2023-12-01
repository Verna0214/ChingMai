const { Category, Spot, Comment, sequelize } = require('../models')

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
  },
  getTopSpots: async (req, res, next) => {
    try {
      const spots = await Spot.findAll({
        attributes: ['id', 'name', 'image', 'comment_counts'],
        order: [[sequelize.literal('comment_counts'), 'DESC']],
        limit: 10,
        raw: true
      })
      console.log(spots)
      return res.render('spots', { spots })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = spotController
