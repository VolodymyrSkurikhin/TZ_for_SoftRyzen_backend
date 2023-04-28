const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
  const { movieId } = req.params;
  if (!isValidObjectId(movieId)) {
    const error = RequestError(400, `${movieId} is not valid`);
    next(error);
  }
  next();
};

module.exports = isValidId;
