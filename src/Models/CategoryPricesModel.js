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

CategoryPricesSchema.virtual("IA", {
  ref: "IA",
  localField: "_id",
  foreignField: "id_categoryprices",
  options: { lean: true },
});

const CategoryPricesModel = mongoose.model("categoriesprices", CategoryPricesSchema);
module.exports = CategoryPricesModel;
