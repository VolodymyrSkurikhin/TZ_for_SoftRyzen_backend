const express = require("express");
const {
  register,
  login,
  logout,
  getCurrentUser,
} = require("../../controllers/auth");
const { registerSchema, loginSchema } = require("../../models/users");
const { cntrWrapper } = require("../../helpers");
const { validator, authenticate, isValidUserId } = require("../../middlewares");

const router = express.Router();

router.post("/signup", validator(registerSchema), cntrWrapper(register));
router.post("/login", validator(loginSchema), cntrWrapper(login));
router.get("/logout", authenticate, cntrWrapper(logout));
router.get("/current", authenticate, cntrWrapper(getCurrentUser));

router.patch("/:userId/subscription", authenticate, isValidUserId);

module.exports = router;
