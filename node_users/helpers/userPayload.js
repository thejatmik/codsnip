module.exports = function(obj) {
  let payload = {};
  const {id, name} = obj;
  payload = {id, name};
  return payload;
};
