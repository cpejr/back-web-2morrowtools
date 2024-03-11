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
    userID: {
      type: Schema.Types.ObjectId,
      trim: true,
      ref: "User",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const NewsletterModel = mongoose.model("Newsletter", NewsletterSchema);
module.exports = NewsletterModel;
