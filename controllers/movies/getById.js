const { Movie } = require("../../models/movies");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { movieId } = req.params;
  const oneMovie = await Movie.findById(movieId);
  if (!oneMovie) {
    throw RequestError(404, "Not found");
  }
  res.json(oneMovie);
};

module.exports = getById;
