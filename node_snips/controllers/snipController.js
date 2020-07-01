const appError = require('../helpers/appError.js');
const {Snippet} = require('../models/index.js');

/**
 * class Snippet Controller
 */
class snipController {
  /**
	 * @param {*} req http request
	 * @param {*} res http response
	 * @param {*} next http next route
	 */
  static removeSnipId(req, res, next) {
    const id = req.params.id;
    Snippet.destroy({
      where: {id},
    })
      .then((result) => {
        if (!result) {
          res.status(404).json({
            error: 'snippet id not found',
          });
        } else {
          res.status(200).json({
            deleted: result,
          });
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
  static patchSnipId(req, res, next) {
    const id = req.params.id;
    if (!id) {
      next(appError(400, 'id required'));
      return;
    }
    const {title, code, description} = req.body;
    Snippet.update({
      title,
      code,
      description,
    }, {
      where: {id},
      returning: true,
    })
      .then((result) => {
        const nUpdated = result[0];
        const updatedObj = result[1][0];
        if (!nUpdated) {
          next(appError(404, 'snippet id not found'));
        } else {
          res.status(200).json({
            items: nUpdated,
            updated: updatedObj,
          });
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
  static getAllSnip(req, res, next) {
    Snippet.findAll({
      order: [
        ['updatedAt', 'DESC'],
      ],
    })
      .then((result) => {
        res.status(200).json({
          snippets: result,
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
  static getSnipId(req, res, next) {
    const id = req.params.id;
    if (!id) {
      next(appError(400, 'id required'));
      return;
    }
    Snippet.findOne({
      where: {
        id,
      },
    })
      .then((result) => {
        if (!result) {
          next(appError(404, 'snippet id not found'));
        } else {
          res.status(200).json({
            snippet: result,
          });
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
  static createSnip(req, res, next) {
    const accessToken = req.accessToken;
    const user = req.userObj;
    const {title, code, description} = req.body;
    Snippet.create({
      title,
      code,
      description,
    }, {
      returning: true,
    })
      .then((result) => {
        res.status(201).json({
          created: result,
          user,
          accessToken,
        });
      })
      .catch((err) => {
        next(err);
        return;
      });
  }
}

module.exports = snipController;
