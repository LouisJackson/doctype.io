'use_strict'

var Sequelize = require('sequelize');

module.exports = function (sequelize, Sequelize) {
  var Link = sequelize.define('Link', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.STRING
      }
  }, {});

  return Link;
}