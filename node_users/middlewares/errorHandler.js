const {ValidationError} = require('sequelize');
module.exports = function(err, req, res, next) {
  if (err instanceof ValidationError) {
    const errors = err.errors.map((item) => {
      return item.message;
    });
    res.status(400).json({
      errors: errors,
    });
  } else if (err instanceof Error) {
    res.status(err.code || 500).json({
      error: err.message || 'internal server error',
    });
  } else {
    res.status(500).json({
      error: 'internal server error',
    });
  }
};
