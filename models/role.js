(function() {
  'use strict';
})();

module.exports = function(sequelize, DataTypes) {
  var Role = sequelize.define('Role', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Role.belongsTo(models.User, {
          as: 'User'
        });
        Role.belongsToMany(models.Document, {
          through: "RoleDocument"
        });
      }
    }
  });
  return Role;
};
