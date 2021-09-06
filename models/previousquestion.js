'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class previousQuestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({question, User}) {
      // define association here
      this.belongsTo(question)
      this.belongsTo(User)
    }
  };
  previousQuestion.init({
    id: {type:DataTypes.INTEGER,
     autoIncrement:true,
     primaryKey:true,
     allowNull:false
    }
  }, {
    sequelize,
    modelName: 'previousQuestion',
  });
  return previousQuestion;
};