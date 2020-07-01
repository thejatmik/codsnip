'use strict';
const {hashPass} = require('../helpers/hasher.js');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: 'insufficient username length',
        },
        notNull: true,
        notEmpty: true,
        isAlphanumeric: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5],
          msg: 'insufficient password length',
        },
        notNull: true,
        notEmpty: true,
      },
    },
  }, {});
  User.addHook('afterValidate', (user, option) => {
    user.password = hashPass(user.password);
  });
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
