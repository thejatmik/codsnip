const bcrypt = require('bcryptjs');

/**
 * hash literal string
 * @param {string} input literal password/string
 * @return {string} hashed password/string
 */
function hashPass(input) {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(input, salt);
  return hash;
}

/**
 * check if pass input to hash
 * @param {string} pass literal password
 * @param {string} hash hashed password
 * @return {bool} pass == hash
 */
function compareHash(pass, hash) {
  return bcrypt.compareSync(pass, hash);
}


module.exports = {
  hashPass,
  compareHash,
};
