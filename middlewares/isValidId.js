const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (idName) => (req, _, next) => {
  const idValue = req.params[idName];
  if (!isValidObjectId(idValue)) {
    const error = RequestError(400, `${idValue} is not valid`);
    next(error);
  }
  next();
};

module.exports = isValidId;
