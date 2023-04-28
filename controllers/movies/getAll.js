const { Movie } = require("../../models/movies");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 3 } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };
  const result = await Movie.find(filter, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email");
  res.json(result);
};

module.exports = getAll;
