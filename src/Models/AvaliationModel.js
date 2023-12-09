const mongoose = require("mongoose");

const AvaliationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      trim: true,
    },
     rate: {
      type: Number,
      required: true,
      trim: true,
    }, 
    iaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "IA",
      required: true,
      trim: true,
    },
     
  },
  {
    versionKey: false,
  }
);

const AvaliationModel = mongoose.model(
  "avaliation",
  AvaliationSchema
);
module.exports = AvaliationModel;
