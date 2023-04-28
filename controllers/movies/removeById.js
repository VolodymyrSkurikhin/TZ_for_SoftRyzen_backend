const { Movie } = require("../../models/movies");
const { RequestError } = require("../../helpers");

const removeById = async (req, res) => {
  const { movieId } = req.params;
  const result = await Movie.findByIdAndRemove(movieId);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({ message: "movie deleted" });
};

module.exports = removeById;
