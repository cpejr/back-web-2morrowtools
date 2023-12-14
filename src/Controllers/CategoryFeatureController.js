const CategoryModel = require("../Models/CategoryFeatureModel");
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

  async readByName(req, res) {
    try {
      const name = req?.query?.name;
      const regexName = new RegExp(name, "i");
      const categoryFeature = await CategoryModel.find({
        name: regexName,
      }).sort("name");
      return res.status(200).json(categoryFeature);
    } catch (error) {
      return res.status(500).json({
        message: "Erro while fetching CategoryFeature by name",
        error: error.message,
      });
    }
  }
  async readNames(req, res) {
    try {
      const names = await CategoryModel.find({}, { name: 1 });
      const namesArray = names.map((ia) => ia.name);
      return res.status(200).json(namesArray);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching CategoryFeature names",
        error: error.message,
      });
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
      const foundCategory = await CategoryModel.findById(id);
      if (!foundCategory)
        return res.status(404).json({ message: "Category not found!" });
      const category = await foundCategory.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new CategoryController();
