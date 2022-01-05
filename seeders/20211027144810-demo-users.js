'use strict';
const { fake } = require('faker');
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('roles', [
      {
        id: 0,
        name: 'user',
        permissions: 'READ_USER, UPDATE_USER',
      },
      {
        id: 1,
        name: 'admin',
        permissions: 'READ_USER, UPDATE_USER, DELETE_USER',
      },
    ])


    const data = [];
    for(let i = 0; i < 100; i++) {
      data.push({
        id: i,
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        roleId: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('Users', data, {});
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
