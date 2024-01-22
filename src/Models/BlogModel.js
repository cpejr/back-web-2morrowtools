const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: string,
    unique: true,
  },
  imageUrl: {
    type: string,
  },
  smallDescription: {
    type: string,
  },
  bigDescription: {
    type: string,
  },
});

const BlogModel = mongoose.model("/blog", BlogSchema);
module.exports = BlogModel;
