const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  html: {
    type: String,
    required: true,
    trim: true,
  },
  id_categoryfeatures: [
    {
      type: Schema.Types.ObjectId,
      ref: "categoriesfeature",
      required: true,
    },
  ],
  id_categoryprofessions: [
    {
      type: Schema.Types.ObjectId,
      ref: "categoriesprofession",
      required: true,
    },
  ],
});

const PostModel = mongoose.model("blog", PostSchema);
module.exports = PostModel;
