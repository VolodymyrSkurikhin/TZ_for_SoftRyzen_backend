// const { RequestError } = require("../../helpers");
// const { User } = require("../../models/users");

const getCurrentUser = async (req, res) => {
  // const { token } = req.user;
  // const user = await User.findOne({ token });
  // if (!user) {
  //   throw RequestError(401, "Not authorized");
  // }
  res.json({ email: req.user.email, username: req.user.username });
};

module.exports = getCurrentUser;
