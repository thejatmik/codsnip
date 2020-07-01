const {sequelize} = require('../models/index.js');
/**
 * Check database status
 * @return {Promise} promise - resolve if connected
 */
function checkDBStatus() {
  return sequelize.authenticate();
}

module.exports = checkDBStatus;
