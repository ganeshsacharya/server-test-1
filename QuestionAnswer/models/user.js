'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.previousQuestion)
    }
    toJSON(){
      return {...this.get(),user_ID:undefined}
    }
  };
  User.init({
    user_ID:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    userName: DataTypes.STRING,
    currentLevel:{
      type:DataTypes.INTEGER,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};