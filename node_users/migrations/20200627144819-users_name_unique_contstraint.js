'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Users',
      {
        fields: ['name'],
        type: 'unique',
        name: 'users_name_unique_constraint',
      },
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Users',
      'users_name_unique_constraint',
    );
  },
};
