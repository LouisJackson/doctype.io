'use_strict'

var Sequelize = require('sequelize');

module.exports = function (sequelize, Sequelize) {
  var Subscriber = sequelize.define('Subscriber', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.STRING,
      }
  }, {});

  return Subscriber;
}