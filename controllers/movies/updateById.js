const { Movie } = require("../../models/movies");
const { RequestError } = require("../../helpers");

const updateById = async (req, res) => {
  const { movieId } = req.params;
  const updatedMovie = await Movie.findByIdAndUpdate(movieId, req.body, {
    new: true,
  });
  if (!updatedMovie) {
    throw RequestError(404, "Not found");
  }
  res.json(updatedMovie);
};

module.exports = updateById;
