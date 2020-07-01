'use strict';
module.exports = (sequelize, DataTypes) => {
  const snippet = sequelize.define('Snippet', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'title cannot be null',
        },
        notEmpty: {
          args: true,
          msg: 'title cannot be empty',
        },
      },
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'code cannot be null',
        },
        notEmpty: {
          args: true,
          msg: 'code cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },
  }, {});
  snippet.associate = function(models) {
    // associations can be defined here
  };
  return snippet;
};
