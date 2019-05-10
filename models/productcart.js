module.exports = (sequelize, DataTypes) => {

var ProductCart = sequelize.define('ProductCart', {
      totalPrice: DataTypes.FLOAT,
      totalQty: DataTypes.FLOAT
  });
  ProductCart.associate = function (models) {
      
      ProductCart.belongsTo(models.Cart, {as: 'cart'});
      ProductCart.belongsTo(models.Products, {as: 'product'})
  };
  return ProductCart;
};