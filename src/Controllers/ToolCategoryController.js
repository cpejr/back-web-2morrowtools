const {
  create: _create,
  read: _read,
  findById,
} = require("../Models/CategoryToolModel");

class CategoryController {
  async create(req, res) {
    try {
      const category = await _create(req.body);
      await category.save();
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const category = await _read(req.body);
      return res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const categoryEncontrada = await findById(id);
      if (!categoryEncontrada) {
        return res
          .status(404)
          .json({ message: "Categoria com id " + id + " não encontrada!" });
      }
      await categoryEncontrada.deleteOne();
      res.status(200).json({
        mensagem: "Categoria com id " + id + " deletada com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const categoryEncontrada = await CategoryMoERROdel.findById(id);
      if (!categoryEncontrada)
        return res
          .status(404)
          .json({ message: "Categoria com id " + id + " não encontrada!" });
      const category = await categoryEncontrada.set(req.body).save();
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new CategoryController();
