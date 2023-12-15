const AvaliationModel = require("../Models/AvaliationModel");

class AvaliationController {
  async create(req, res) {
    try {
      const category = await AvaliationModel.create(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERROR", error: error.message });
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

  async getByIaId(req, res) {
    try {
      const { iaId } = req.params;
  
      // Buscar todas as avaliações pelo iaId
      const evaluations = await AvaliationModel.find({ iaId });
  
      if (!evaluations || evaluations.length === 0) {
        return res.status(404).json({ message: "No evaluations found for this IA!" });
      }
  
      // Filtrar avaliações com rate válido e calcular a média
      const validRatings = evaluations.filter(evaluation => typeof evaluation.rate === 'number' && !isNaN(evaluation.rate));
  
  
      if (validRatings.length === 0) {
        return res.status(404).json({ message: "No valid ratings found for this IA!" });
      }
  
      const totalRatings = validRatings.reduce((acc, curr) => acc + curr.rate, 0);
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
