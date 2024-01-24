const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
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
  id_categoryprofession: {
    type: Schema.Types.ObjectId,
    ref: "categoriesprofession",
    required: true,
  },    
  id_categoryfeature: {
    type: Schema.Types.ObjectId,
    ref: "categoriesfeature",
    required: true,
  },
});

const BlogModel = mongoose.model("/blog", BlogSchema);
module.exports = BlogModel;
