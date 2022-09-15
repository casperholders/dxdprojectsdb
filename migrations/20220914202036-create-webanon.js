'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up({ context: sequelize }) {
    await sequelize.query("\n" +
      "CREATE ROLE web_anon NOLOGIN;\n" +
      "\n" +
      "grant usage on schema public to web_anon;\n" +
      "grant select on public.projects to web_anon;\n" +
      "grant select on public.statuses to web_anon;\n" +
      "grant select on public.tags to web_anon;")
  },
  async down({ context: sequelize }) {
    await sequelize.query("\n" +
      "DROP OWNED BY web_anon;\n" +
      "\n" +
      "DROP ROLE web_anon;")
  }
};
