const mongoose = require("mongoose");

const CategoryFeatureSchema = new mongoose.Schema(
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

const CategoryModel = mongoose.model(
  "categoriesfeature",
  CategoryFeatureSchema
);
module.exports = CategoryModel;
