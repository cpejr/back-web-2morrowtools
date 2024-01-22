const AvaliationModel = require("../Models/AvaliationModel");

class AvaliationController {
  async create(req, res) {
    try {
      const { userId, iaId } = req.body;
      const evaluations = await AvaliationModel.find({ userId, iaId });
      if (evaluations.length < 1) {
        const category = await AvaliationModel.create(req.body);
        return res.status(200).json(category);
      } else
        return res
          .status(500)
          .json({ message: "User has already rated this IA" });
    } catch (error) {
      res.status(500).json({ message: "ERROR5", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const category = await AvaliationModel.find(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async getUserAvaliation(req, res) {
    try {
      const { userId, iaId } = req.query;
      const avaliation = await AvaliationModel.findOne({ userId, iaId });
      const { _id, rate } = avaliation;
      let result = {};
      result = { _id, rate };
      return res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error while fetching ID", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const foundCategory = await AvaliationModel.findById(id);
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
      const foundCategory = await AvaliationModel.findById(id);
      if (!foundCategory)
        return res.status(404).json({ message: "Category not found!" });
      const category = await foundCategory.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async getTrueFalse(req, res) {
    try {
      const { iaId } = req.params;
      const evaluations = await AvaliationModel.find({ iaId });
      let result = true;
      if (evaluations.length === 0) result = false;
      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching IA rating",
        error: error.message,
      });
    }
  }
  async getUserHasRated(req, res) {
    try {
      let result = true;
      const { iaId } = req.params;
      const { userId } = req.query;
      const evaluations = await AvaliationModel.find({ iaId, userId });
      if (evaluations.length === 0) result = false;

      return res.status(200).json(result);
    } catch (error) {
      res.status(500).json({
        message: "Error while fetching User ratings",
        error: error.message,
      });
    }
  }

  async getByIaId(req, res) {
    try {
      const { iaId } = req.params;
      const evaluations = await AvaliationModel.find({ iaId });

      if (!evaluations || evaluations.length === 0)
        return res
          .status(404)
          .json({ message: "No evaluations found for this IA!" });

      const validRatings = evaluations.filter(
        (evaluation) =>
          typeof evaluation.rate === "number" && !isNaN(evaluation.rate)
      );

      if (validRatings.length === 0)
        return res
          .status(404)
          .json({ message: "No valid ratings found for this IA!" });

      const totalRatings = validRatings.reduce(
        (acc, curr) => acc + curr.rate,
        0
      );
      const averageRating = totalRatings / validRatings.length;

      return res.status(200).json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async destroyAll(req, res) {
    try {
      await AvaliationModel.deleteMany({});
      res.status(200).json({
        message: "All avaliations successfully deleted!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}

module.exports = new AvaliationController();
