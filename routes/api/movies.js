const express = require("express");
const {
  add,
  getAll,
  getById,
  removeById,
  updateById,
} = require("../../controllers/movies");

const { movieSchema } = require("../../models/movies");

const { cntrWrapper } = require("../../helpers");

const { isValidId, validator, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, cntrWrapper(getAll));

router.get(
  "/:movieId",
  authenticate,
  isValidId("movieId"),
  cntrWrapper(getById)
);

router.post("/", authenticate, validator(movieSchema), cntrWrapper(add));

router.delete(
  "/:movieId",
  authenticate,
  isValidId("movieId"),
  cntrWrapper(removeById)
);

router.put(
  "/:movieId",
  authenticate,
  isValidId,
  validator(movieSchema),
  cntrWrapper(updateById)
);

module.exports = router;
