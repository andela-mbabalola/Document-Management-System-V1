'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        notNull: true
      },
      content: {
        type: Sequelize.STRING,
        notNull: true
      },
      ownerId: {
        type: Sequelize.INTEGER,
        not: ["[a-z]",'i'],
        notNull: true
      },
      datePublished: {
        allowNull: false,
        type: Sequelize.DATE,
        isDate: true,
      }
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
    return queryInterface.dropTable('Documents');
  }
};