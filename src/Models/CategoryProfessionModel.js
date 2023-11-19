const mongoose = require("mongoose");

const CategoryProfessionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  {
    versionKey: false,
  }
);

const CategoryProfessionModel = mongoose.model(
  "categoriesprofession",
  CategoryProfessionSchema
);
module.exports = CategoryProfessionModel;
