const IAModel = require("../Models/IAModel");
const convertStringToRegexp = require("../Utils/ConvertStringtoRegexp.js");

class IAController {
  async create(req, res) {
    try {
      const IA = await IAModel.create(req.body);

      return res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;

      if (id) {
        const foundIA = await IAModel.findById(id);

        if (!foundIA) {
          return res.status(404).json({ message: `ID not found.` });
        }

        return res.status(200).json(foundIA);
      } else {
        const IAs = await IAModel.find(req.body)
          .populate("id_categoryfeature")
          .populate("id_categoryprice")
          .populate("id_categoryprofession");

        return res.status(200).json(IAs);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while fetching IA", error: error.message });
    }
  }
  async readByName(req, res) {
    try {
      const name = req.query?.name;
      const regexName = new RegExp(name, "i");
      const AIs = await IAModel.find({ name: regexName })
        .sort("name")
        .populate("id_categoryfeature")
        .populate("id_categoryprice")
        .populate("id_categoryprofession");

      return res.status(200).json(AIs);
    } catch (error) {
      return res.status(500).json({
        message: "Error while fetching AI by name",
        error: error.message,
      });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundIA = await IAModel.findById(id);
      if (!foundIA) {
        return res.status(404).json({ message: "Tool not found!" });
      }
      await foundIA.deleteOne();
      res.status(200).json({
        message: "Tool successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundIA = await IAModel.findById(id);
      if (!foundIA) return res.status(404).json({ message: "Tool not found!" });
      const IA = await foundIA.set(req.body).save();
      res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async filterCategories(req, res) {
    try {
      let idsArray = [];
      const { id } = req.query;

      if (id) {
        idsArray = id.split(",");
      }

      if (idsArray.length === 0) {
        const allTools = await IAModel.find();
        return res.status(200).json(allTools);
      }

      const foundCategories = await Promise.all([
        CategoryPricesModel.find({ _id: { $in: idsArray } }),
        CategoryProfessionModel.find({ _id: { $in: idsArray } }),
        CategoryModel.find({ _id: { $in: idsArray } }),
      ]);

      const isValidCategories = foundCategories.some((data) => data.length > 0);
      if (!isValidCategories) {
        return res
          .status(404)
          .json({ message: "One or more categories not found!" });
      }

      const toolsPrice = await IAModel.find({
        id_categoryprice: { $in: idsArray },
      });
      const toolsProfession = await IAModel.find({
        id_categoryprofession: { $in: idsArray },
      });
      const toolsFeature = await IAModel.find({
        id_categoryfeature: { $in: idsArray },
      });

      const tools = [...toolsPrice, ...toolsProfession, ...toolsFeature];

      return res.status(200).json(tools);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new IAController();
