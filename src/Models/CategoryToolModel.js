const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
    trim: true,
  },
});

const categoryModel = mongoose.model("categorias", categorySchema);
module.exports = categoryModel;
