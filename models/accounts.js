module.exports = function(sequelize, DataTypes){
  var Accounts = sequelize.define("Accounts", {
     username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[6,25]
      }

    },
     email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[2],
        isEmail:true
      }
    },
     password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[4,20]
      }
    },
    last_login: {
      type: DataTypes.DATE},
    status: {
      type: DataTypes.ENUM('active','inactive'),defaultValue:'active' }
  })
  Accounts.associate = function (models) {
    Accounts.hasMany(models.Order)
};
  return Accounts
}