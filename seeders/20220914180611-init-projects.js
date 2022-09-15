'use strict';

let json = require('../result.json');

module.exports = {
  async up ({ context: sequelize }) {
    await sequelize.getQueryInterface().bulkInsert('projects', json, {});
  },

  async down ({ context: sequelize }) {
    await sequelize.getQueryInterface().bulkDelete('projects', null, {});
  }
};
