'use strict'
const faker = require('faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM Categories;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )
    await queryInterface.bulkInsert('Spots',
      Array.from({ length: 50 }, () => ({
        name: faker.name.findName(),
        tel: faker.phone.phoneNumberFormat(),
        address: faker.address.streetAddress(true),
        opening_hours: '08:00',
        closed_hours: '22:00',
        description: faker.lorem.paragraph(),
        created_at: new Date(),
        updated_at: new Date(),
        category_id: categories[Math.floor(Math.random() * categories.length)].id
      })), {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Spots', null, {})
  }
}
