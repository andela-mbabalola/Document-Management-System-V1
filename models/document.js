(function() {
  'use strict';
})();

module.exports = function(sequelize, DataTypes) {
  var Document = sequelize.define('Document', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    datePublished: DataTypes.DATE,
    //ownerId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Document.belongsToMany(models.Role, {
          through: "RoleDocument"
        });
      }
    }
  });
  return Document;
};
