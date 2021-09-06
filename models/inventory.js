'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    toJSON(){
        return {...this.get(),id:undefined,UserUserID:undefined}
    }
  };
  inventory.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    coin: DataTypes.STRING,
    life: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'inventory',
  });
  return inventory;
};