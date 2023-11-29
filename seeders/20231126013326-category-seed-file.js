'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories',
      ['咖啡廳', '購物', '美食', '文化', '按摩'].map(item => {
        return {
          name: item,
          created_at: new Date(),
          updated_at: new Date(),
          image: `https://loremflickr.com/300/220/restaurant,food/?random=${Math.random() * 100}`
        }
      }), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {})
  }
}
