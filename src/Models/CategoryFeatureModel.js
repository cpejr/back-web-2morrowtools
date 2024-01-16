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

CategoryFeatureSchema.virtual("IA", {
  ref: "IA",
  localField: "_id",
  foreignField: "id_categoryfeature",
  options: { lean: true },
});

const CategoryModel = mongoose.model(
  "categoriesfeature",
  CategoryFeatureSchema
);
module.exports = CategoryModel;
