const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

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
  const payload = { id: result._id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  await User.findByIdAndUpdate(result._id, { token });

  res
    .status(201)
    .json({ user: { username: result.username, email: result.email }, token });
};

module.exports = register;
