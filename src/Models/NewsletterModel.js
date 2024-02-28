const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewsletterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NewsletterModel = mongoose.model("Newsletter", NewsletterSchema);
module.exports = NewsletterModel;
