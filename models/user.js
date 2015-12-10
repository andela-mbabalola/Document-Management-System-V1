(function() {
  'use strict';
})();

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.belongsTo(models.Role, {
          as: 'Role'
        });
        User.hasMany(models.Document);
      }
    }
  });
  return User;
};
