const { Category } = require('../models')

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
  }
}

module.exports = spotController
