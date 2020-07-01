module.exports = function(code, message) {
  const appError = new Error(message);
  appError.code = code;
  return appError;
};
