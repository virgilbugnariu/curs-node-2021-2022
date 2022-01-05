'use strict';

const Permissions = require("../config/permissions");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('roles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      permissions: {
        type: Sequelize.STRING
      }
    });

    await queryInterface.bulkInsert('roles', [
      {
        id: 0,
        name: 'user',
        permissions: Object.keys(Permissions).join(','),
      },
      {
        id: 1,
        name: 'admin',
        permissions: Object.keys(Permissions).join(','),
      }
    ]);

    await queryInterface.addColumn(
      'Users',
      'roleId',
      {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'roles'
          },
          key: 'id',
        }
      }
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('roles');
  }
};