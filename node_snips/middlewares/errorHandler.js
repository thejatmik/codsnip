const {ValidationError} = require('sequelize');

module.exports = function(err, req, res, next) {
  if (err instanceof ValidationError) {
    const errors = err.errors.map((item) => item.message);
    res.status(400).json({
      errors: errors,
    });
  } else if (err instanceof Error) {
    res.status(err.code).json({
      error: err.message,
    });
  } else {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};
