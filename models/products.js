module.exports = function(sequelize, DataTypes){
  var Products = sequelize.define("Products", {
     name: {
      type: DataTypes.STRING,
      allowNull: false

    },
     price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
     category:{
      type: DataTypes.STRING,
      allowNull: false
    },
     image:{
       type: DataTypes.STRING,
       allowNull: false
     }
  })
  return Products
}