'use strict'
const faker = require('faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const spots = await queryInterface.sequelize.query(
      'SELECT id FROM Spots;',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    )

    const commentsData = Array.from({ length: 150 }, () => {
      const spotId = spots[Math.floor(Math.random() * spots.length)].id
      return {
        text: faker.lorem.sentence(),
        name: faker.name.findName(),
        spot_id: spotId,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    await queryInterface.bulkInsert('Comments', commentsData, {})

    // 更新 Spots 記錄的 commentCounts
    await Promise.all(
      spots.map(async spot => {
        const commentCountResult = await queryInterface.sequelize.query(
          'SELECT COUNT(*) as count FROM Comments WHERE spot_id = :spotId;',
          {
            replacements: { spotId: spot.id },
            type: queryInterface.sequelize.QueryTypes.SELECT
          }
        )

        const commentCount = commentCountResult[0].count

        await queryInterface.sequelize.query(
          'UPDATE Spots SET comment_counts = :comment_counts WHERE id = :spotId;',
          {
            replacements: { spotId: spot.id, comment_counts: commentCount },
            type: queryInterface.sequelize.QueryTypes.UPDATE
          }
        )
      })
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', {})
  }
}
