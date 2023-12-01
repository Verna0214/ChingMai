'use strict'
const spotData = require('./spotData.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT * FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    const spots = spotData.map(spot => {
      categories.forEach(category => {
        if (spot.category_id === category.name) {
          spot.category_id = category.id
        }
      })
      spot.google_link = `https://www.google.com/maps/search/${spot.address}`
      spot.created_at = new Date()
      spot.updated_at = new Date()
      return spot
    })

    await queryInterface.bulkInsert('Spots', spots, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {})
  }
}
