'use strict';
const { DataTypes } = require('sequelize');
module.exports = {
  async up({ context: sequelize }) {
    await sequelize.getQueryInterface().createTable('projects', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.TEXT
      },
      short_description: {
        type: DataTypes.TEXT
      },
      explanation_solve: {
        type: DataTypes.TEXT
      },
      explanation_benefit: {
        type: DataTypes.TEXT
      },
      explanation_goal: {
        type: DataTypes.TEXT
      },
      total_grant: {
        type: DataTypes.INTEGER
      },
      license: {
        type: DataTypes.INTEGER
      },
      grant_id: {
        type: DataTypes.TEXT
      },
      status: {
        type: DataTypes.TEXT
      },
      created_at: {
        type: DataTypes.TEXT
      },
      updated_at: {
        type: DataTypes.TEXT
      },
      deny_reason: {
        type: DataTypes.TEXT
      },
      approved_at: {
        type: DataTypes.TEXT
      },
      type: {
        type: DataTypes.TEXT
      },
      linkedin: {
        type: DataTypes.TEXT
      },
      github: {
        type: DataTypes.TEXT
      },
      resume: {
        type: DataTypes.TEXT
      },
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT)
      },
      milestones: {
        type: DataTypes.JSONB
      }
    });
  },
  async down({ context: sequelize }) {
    await sequelize.getQueryInterface().dropTable('projects');
  }
};
