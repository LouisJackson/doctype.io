'use_strict'

var Sequelize = require('sequelize');

module.exports = function (sequelize, Sequelize) {
  var User = sequelize.define('User', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      }
  }, {});

  return User;
}