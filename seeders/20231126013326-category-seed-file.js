'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      ['咖啡廳', '購物', '美食', '文化'].map(item => {
        return {
          name: item,
          created_at: new Date(),
          updated_at: new Date()
        }
      }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
