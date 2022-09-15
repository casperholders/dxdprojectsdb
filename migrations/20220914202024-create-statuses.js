'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up({ context: sequelize }) {
    await sequelize.getQueryInterface().createTable('statuses', {
      status: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      },
    });
  },
  async down({ context: sequelize }) {
    await sequelize.getQueryInterface().dropTable('statuses');
  }
};
