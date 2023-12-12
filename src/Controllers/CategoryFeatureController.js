const IAController = require("./IAController");
const CategoryModel = require("../Models/CategoryFeatureModel");
const IAModel = require("../Models/IAModel");
class CategoryController {
  async create(req, res) {
    try {
      const category = await CategoryModel.create(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const category = await CategoryModel.find(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundCategory = await CategoryModel.findById(id);
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found!" });
      }
      await foundCategory.deleteOne();
      res.status(200).json({
        message: "Category successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      console.log(id);
      const foundCategory = await CategoryModel.findById(id);
      if (!foundCategory)
        return res.status(404).json({ message: "Category not found!" });
      const category = await foundCategory.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async readById(req, res) {
    try {
      const { _id } = req.params;

      // Encontrar a categoria pelo ID
      const foundCategory = await CategoryModel.findById(_id);
      if (!foundCategory) {
        return res.status(404).json({ message: "Category not found!" });
      }

      const tools = await IAModel.find({ id_categoryfeature: _id })
        .populate("id_categoryfeature")
        .populate("id_categoryprice")
        .populate("id_categoryprofession");

      return res.status(200).json(tools);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}
module.exports = new CategoryController();
