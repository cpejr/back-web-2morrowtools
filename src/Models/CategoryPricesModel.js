const mongoose = require("mongoose");

const CategoryPricesSchema = new mongoose.Schema(
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

const CategoryPricesModel = mongoose.model(
  "categoriesprices",
  CategoryPricesSchema
);
module.exports = CategoryPricesModel;
