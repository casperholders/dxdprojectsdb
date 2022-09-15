'use strict';
const {
  Model, DataTypes
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Projects extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Projects.init({
    title: DataTypes.TEXT,
    short_description: DataTypes.TEXT,
    explanation_solve: DataTypes.TEXT,
    explanation_benefit: DataTypes.TEXT,
    explanation_goal: DataTypes.TEXT,
    total_grant: DataTypes.INTEGER,
    license: DataTypes.INTEGER,
    grant_id: DataTypes.TEXT,
    status: DataTypes.TEXT,
    created_at: DataTypes.TEXT,
    updated_at: DataTypes.TEXT,
    deny_reason: DataTypes.TEXT,
    approved_at: DataTypes.TEXT,
    type: DataTypes.TEXT,
    linkedin: DataTypes.TEXT,
    github: DataTypes.TEXT,
    resume: DataTypes.TEXT,
    tags: DataTypes.ARRAY(DataTypes.TEXT),
    milestones: DataTypes.JSONB
  }, {
    sequelize,
    modelName: 'projects',
  });
  return Projects;
};
