'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        notNull: true
      },
      lastName: {
        type: Sequelize.STRING,
        notNull: true
      },
      userName: {
        type: Sequelize.STRING,
        notNull: true
      },
      password: {
        type: Sequelize.STRING,
        notNull: true
      },
      email: {
        type: Sequelize.STRING,
        isEmail: true,
        notNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};