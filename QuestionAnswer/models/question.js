'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({answer, previousQuestion}) {
      // define association here
      this.belongsTo(answer)
      this.hasMany(previousQuestion)
    }
  };
  question.init({
    questionID:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true,
      allowNull:false
    },
    question: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'question',
  });
  return question;
};