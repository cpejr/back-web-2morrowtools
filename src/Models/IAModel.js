const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const IASchema = new mongoose.Schema(
  {
    id_categoryfeature: {
      type: Schema.Types.ObjectId,
      ref: "categoriesfeature",
      required: true,
    },
    id_categoryprice: {
      type: Schema.Types.ObjectId,
      ref: "categoriesprices",
      required: true,
    },
    id_categoryprofession: {
      type: Schema.Types.ObjectId,
      ref: "categoriesprofession",
      required: true,
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
      required: true,
      trim: true,
    },
    youtubeVideoLink: {
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    discord: {
      type: String,
      trim: true,
    },
    twitterX: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    tiktok: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    reddit: {
      type: String,
      trim: true,
    },
    pinterest: {
      type: String,
      trim: true,
    },
    youtube: {
      type: String,
      trim: true,
    },
  },
  {
    versionKey: false,
  }
);

const IAModel = mongoose.model("IA", IASchema);
module.exports = IAModel;
