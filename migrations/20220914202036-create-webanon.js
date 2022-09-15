'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up({ context: sequelize }) {
    await sequelize.query('CREATE VIEW statuses_stats AS\n' +
      'SELECT status, count(\'status\')\n' +
      'FROM projects\n' +
      'group by status;\n' +
      '\n' +
      'CREATE VIEW tags_stats AS\n' +
      'select distinct(a1) as tag, count(a1) as count\n' +
      'from (select unnest(tags) as a1\n' +
      '      from projects) projects\n' +
      'group by a1\n' +
      'UNION\n' +
      'SELECT \'None\' as tag, count(*)\n' +
      'from projects\n' +
      'where tags is null;');
    await sequelize.query('\n' +
      'CREATE ROLE web_anon NOLOGIN;\n' +
      '\n' +
      'grant usage on schema public to web_anon;\n' +
      'grant select on public.projects to web_anon;\n' +
      'grant select on public.statuses to web_anon;\n' +
      'grant select on public.tags to web_anon;\n' +
      'grant select on public.tags_stats to web_anon;\n' +
      'grant select on public.statuses_stats to web_anon;\n');
  },
  async down({ context: sequelize }) {
    await sequelize.query('\n' +
      'DROP OWNED BY web_anon;\n' +
      '\n' +
      'DROP ROLE web_anon;\n' +
      'DROP VIEW IF EXISTS "statuses_stats";\n' +
      'DROP VIEW IF EXISTS "tags_stats";');
  },
};
