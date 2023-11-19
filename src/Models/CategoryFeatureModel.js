const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
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

const CategoryModel = mongoose.model("categoriesfeature", CategorySchema);
module.exports = CategoryModel;
