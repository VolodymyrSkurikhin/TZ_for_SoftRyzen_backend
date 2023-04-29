const { Schema, model } = require("mongoose");
const DateExtension = require("@joi/date");
const JoiImport = require("joi");
const Joi = JoiImport.extend(DateExtension);
const { handleSchemaValidationErrors } = require("../helpers");

const movieDBSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Set title for movie"],
    },
    director: {
      type: String,
      required: [true, "Set director's name for movie"],
    },
    date: {
      type: String,
      required: [true, "Set release date for movie"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

movieDBSchema.post("save", handleSchemaValidationErrors);

const movieSchema = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  date: Joi.date().format("DD-MM-YYYY").less("now").raw().required(),
});

const Movie = model("movie", movieDBSchema);

module.exports = { Movie, movieSchema };
