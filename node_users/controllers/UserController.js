const {User} = require('../models/index.js');
const appError = require('../helpers/appError.js');
const userPayload = require('../helpers/userPayload.js');
const TokenGen = require('../helpers/tokenGen.js');
const {compareHash} = require('../helpers/hasher.js');
console.log(User);
/**
 * Class for UserController
 */
class UserController {
  /**
	 * @param {*} req http request
	 * @param {*} res http response
	 * @param {*} next http next route
	 */
  static checkToken(req, res, next) {
    const accessToken = req.header('accessToken');
    if (!accessToken) {
      next(appError(404, 'token not found'));
      return;
    }
    const userPayload = TokenGen.verify(accessToken);
    if (!userPayload) {
      next(appError(400, 'invalid token'));
      return;
    }
    User.findOne({
      where: {
        name: userPayload.name,
        id: userPayload.id,
      },
    })
      .then((result) => {
        if (!result) {
          throw appError(404, 'invalid token');
        }
        const newToken = TokenGen.sign(userPayload);
        res.status(200).json({
          user: userPayload,
          accessToken: newToken,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
  /**
	 * @param {*} req http request
	 * @param {*} res http response
	 * @param {*} next http next route
	 */
  static login(req, res, next) {
    const {name, password} = req.body;
    if (!name || !password) {
      throw appError(400, 'user/password cannot be empty');
    }
    User.findOne({
      where: {
        name,
      },
    })
      .then((result) => {
        if (result) {
          const pass = compareHash(password, result.password);
          if (pass) {
            const payload = userPayload(result);
            const accessToken = TokenGen.sign(payload);
            res.status(200).json({
              accessToken,
              user: result,
            });
          } else {
            throw appError(400, 'wrong username/pass');
          }
        } else {
          throw appError(404, 'username not found');
        }
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
	 * @param {*} req http request
	 * @param {*} res http response
	 * @param {*} next http next route
	 */
  static register(req, res, next) {
    const {name, password} = req.body;
    if (!name || !password) {
      throw appError(400, 'bad request');
    }
    User.create({
      name,
      password,
    }, {
      returning: true,
    })
      .then((result) => {
        const user = userPayload(result.dataValues);
        const accessToken = TokenGen.sign(user);
        res.status(201).json({
          user,
          accessToken,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
}

module.exports = UserController;
