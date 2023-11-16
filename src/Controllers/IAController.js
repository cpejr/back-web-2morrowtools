const IAModel = require("../Models/IAModel");

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
          return res
            .status(404)
            .json({ message: `IA with ID ${id} not found.` });
        }

        return res.status(200).json(foundIA);
      } else {
        const IAs = await IAModel.find(req.body);
        return res.status(200).json(IAs);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while fetching IA", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundIA = await IAModel.findById(id);
      if (!foundIA) {
        return res
          .status(404)
          .json({ message: "Tool with id " + id + " not found!" });
      }
      await foundIA.deleteOne();
      res.status(200).json({
        message: "Tool with id " + id + " successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const foundIA = await IAModel.findById(id);
      if (!foundIA)
        return res
          .status(404)
          .json({ message: "Tool with id " + id + " not found!" });
      const IA = await foundIA.set(req.body).save();
      res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new IAController();
