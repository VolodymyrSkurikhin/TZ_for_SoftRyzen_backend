const bcrypt = require("bcryptjs");

const { RequestError } = require("../../helpers");
const { User } = require("../../models/users");

const register = async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "This email is already in use");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  res.status(201).json({ user: { username:result.username, email: result.email } });
};

module.exports = register;
