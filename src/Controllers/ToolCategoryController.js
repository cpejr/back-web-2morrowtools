const CategoryModel = require("../Models/CategoryToolModel");

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
        return res
          .status(404)
          .json({ message: "Category with id " + id + " not found!" });
      }
      await foundCategory.deleteOne();
      res.status(200).json({
        message: "Category with id " + id + " successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundCategory = await CategoryModel.findById(id);
      if (!foundCategory)
        return res
          .status(404)
          .json({ message: "Category with id " + id + " not found!" });
      const category = await foundCategory.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new CategoryController();
