'use strict';
const faker = require('faker');
const db = require('../models');


module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allUsers = await db.User.findAll();
    const posts = [];
    for(let i = 0; i < 200; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      posts.push({
        userId,
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    await queryInterface.bulkInsert('Posts', posts , {});

    await queryInterface.bulkInsert('Posts', [{
      userId: 1,
      title: 'Post de Test',
      body: 'alt test',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Posts', null, {});
  }
};
