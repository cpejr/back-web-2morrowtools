import mongoose from "module";

const IASchema = new mongoose.Schema({
  id_category: {
    type: Schema.Types.ObjectId,
    ref: "categorias",
  },
  IAname: {
    type: String,
    required: true,
    trim: true,
  },
  shortDescription: {
    type: String,
    required: true,
    trim: true,
  },
  largeDescription: {
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
    require: true,
    trim: true,
  },
  priceType: {
    type: Number,
    require: true,
    trim: true,
  },
});

const IAModel = mongoose.model("IA", IASchema);
module.exports = IAModel;
