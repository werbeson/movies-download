const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {type: String},
  urlImg: {type: String},
  data: { type: Date, default: Date.now }
});

module.exports = Movies = mongoose.model("movies", movieSchema);
