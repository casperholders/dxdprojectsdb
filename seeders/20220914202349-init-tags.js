'use strict';

let json = require('../tags.json');

module.exports = {
  async up ({ context: sequelize }) {
    await sequelize.getQueryInterface().bulkInsert('tags', json, {});
  },

  async down ({ context: sequelize }) {
    await sequelize.getQueryInterface().bulkDelete('tags', null, {});
  }
};
