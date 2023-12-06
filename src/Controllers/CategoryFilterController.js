const IAModel = require("../models/IAModel");

class CategoryFilterController {
  async create(req, res) {
    try {
      const ia = await IAModel.create(req.body);
      return res.status(200).json(ia);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const ias = await IAModel.find(req.body);
      return res.status(200).json(ias);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}
module.exports = new CategoryFilterController();
