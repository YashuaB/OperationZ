module.exports = function(sequelize, DataTypes){
  var Products = sequelize.define("Products", {
     name: {
      type: DataTypes.STRING,
      allowNull: false

    },
     price: {
      type: DataTypes.DECIMAL(10,2),
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
  }, {
    timestamps: false
  })
  return Products
}