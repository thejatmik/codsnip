require('dotenv').config();
const appError = require('../helpers/appError.js');
const axios = require('axios');
const userApiHost = process.env.USER_API_HOST;
const userApiPort = process.env.USER_API_PORT;
/**
 * class User Middleware for auth
 */
class userMiddleware {
  /**
	 * @param {*} req http request
	 * @param {*} res http response
	 * @param {*} next http next route
	 */
  static authenticator(req, res, next) {
    const accessToken = req.header('accessToken');
    if (!accessToken) {
      next(appError(401, 'unauthorized'));
      return;
    }
    console.log(userApiHost, userApiPort, accessToken);
    axios({
      method: 'GET',
      headers: {accessToken: accessToken},
      url: `http://${userApiHost}:${userApiPort}/checkToken`,
    })
      .then((result) => {
        req.userObj = result.data.user;
        req.accessToken = result.data.accessToken;
        next();
        return;
      })
      .catch((err) => {
        next(appError(404, 'unauthorized'));
        return;
      });
  }
}

module.exports = userMiddleware;
