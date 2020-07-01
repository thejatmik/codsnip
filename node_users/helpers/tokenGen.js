require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Token Generator class
 */
class TokenGen {
  /**
	 * @param {*} payload object to be converted to token
	 * @return {string} jwt token
	 */
  static sign(payload) {
    return jwt.sign(payload, JWT_SECRET);
  }

  /**
	 * @param {string} token to converted to payload
	 * @return {*} user payload object
	 */
  static verify(token) {
    let payload;
    jwt.verify(token, JWT_SECRET, (_, decoded) => {
      payload = decoded;
    });
    return payload;
  }
}

module.exports = TokenGen;
