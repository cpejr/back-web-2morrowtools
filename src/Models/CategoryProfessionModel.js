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

CategoryProfessionSchema.virtual("IA", {
  ref: "IA",
  localField: "_id",
  foreignField: "id_categoryprofession",
  options: { lean: true },
});

const CategoryProfessionModel = mongoose.model(
  "categoriesprofession",
  CategoryProfessionSchema
);
module.exports = CategoryProfessionModel;
