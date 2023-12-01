'use strict'
const categoryData = require('./categoryData.json').results

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = categoryData.map(category => {
      category.created_at = new Date()
      category.updated_at = new Date()

      return category
    })
    await queryInterface.bulkInsert('Categories', data, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
