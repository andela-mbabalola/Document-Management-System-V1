module.exports = function syncModels () {
  var models = require('../models'),
      debug  = require('debug')('DMS');

  models.sequelize.sync().then(function () {
      debug('Models Successfully synced with database');
      console.log('Models Successfully synced with database');
      process.exit(0);
    });
};