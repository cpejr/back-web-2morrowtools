const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const FavoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  },
  toolId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    trim: true,
  }
});

const FavoriteModel = mongoose.model("Favorite", FavoriteSchema);
module.exports = FavoriteModel;