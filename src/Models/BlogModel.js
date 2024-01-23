const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: string,
    unique: true,
    required: true,
  },
  imageUrl: {
    type: string,
    required: true,
  },
  smallDescription: {
    type: string,
    required: true,
  },
  bigDescription: {
    type: string,
    required: true,
  },
  id_categoryfeature: {
    type: Schema.Types.ObjectId,
    ref: "categoriesfeature",
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
