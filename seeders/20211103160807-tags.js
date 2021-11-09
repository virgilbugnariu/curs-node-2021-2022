'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tags = [];
    for(let i = 0; i < 50; i++) {
      const label = faker.lorem.words();
      tags.push({
        label,
        slug: label.replaceAll(' ', '-'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    await queryInterface.bulkInsert('Tags', tags , {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tags', null, {});
  }
};
