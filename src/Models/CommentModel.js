const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
      trim: true,
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    id_ia: {
      type: Schema.Types.ObjectId,
      ref: "IA",
      required: false,
    },
    id_post: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const CommentsModel = mongoose.model("comments", CommentSchema);
module.exports = CommentsModel;
