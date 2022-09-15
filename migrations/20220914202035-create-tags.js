'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up({ context: sequelize }) {
    await sequelize.getQueryInterface().createTable('tags', {
      tag: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING
      }
    });
  },
  async down({ context: sequelize }) {
    await sequelize.getQueryInterface().dropTable('tags');
  }
};
