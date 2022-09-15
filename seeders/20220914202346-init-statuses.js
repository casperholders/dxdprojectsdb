'use strict';

let json = require('../statuses.json');

module.exports = {
  async up ({ context: sequelize }) {
    await sequelize.getQueryInterface().bulkInsert('statuses', json, {});
  },

  async down ({ context: sequelize }) {
    await sequelize.getQueryInterface().bulkDelete('statuses', null, {});
  }
};
