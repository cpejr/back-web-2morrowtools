const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IASchema = new mongoose.Schema(
  {
    id_category: {
      type: Schema.Types.ObjectId,
      ref: "categories",
    },
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    longDescription: {
      type: String,
      required: true,
      trim: true,
    },
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      require: true,
      trim: true,
    },
    priceType: {
      type: String,
      require: true,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

const IAModel = mongoose.model("IA", IASchema);
module.exports = IAModel;
