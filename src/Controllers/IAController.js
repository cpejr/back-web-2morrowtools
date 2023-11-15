const IAModel = require("../Models/IAModel");

class IAController {
  async create(req, res) {
    try {
      const IA = await IAModel.create(req.body);

      return res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;

      if (id) {
        // Se o ID estiver presente, busca por ID
        const IAEncontrada = await IAModel.findById(id);

        if (!IAEncontrada) {
          return res
            .status(404)
            .json({ message: `IA com o ID ${id} não encontrada.` });
        }

        return res.status(200).json(IAEncontrada);
      } else {
        // Se o ID não estiver presente, faz uma busca sem critério específico
        const IAs = await IAModel.find(req.body);
        return res.status(200).json(IAs);
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Erro ao buscar IA", error: error.message });
    }
  }

  async destroy(req, res) {
    try {
      const { id } = req.params;

      const IAEncontrada = await IAModel.findById(id);
      if (!IAEncontrada) {
        return res
          .status(404)
          .json({ message: "Ferramenta com id " + id + " não encontrada!" });
      }
      await IAEncontrada.deleteOne();
      res.status(200).json({
        mensagem: "Ferramenta com id " + id + " deletada com sucesso!",
      });
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const IAEncontrada = await IAModel.findById(id);
      if (!IAEncontrada)
        return res
          .status(404)
          .json({ message: "Ferramenta com id " + id + " não encontrada!" });
      const IA = await IAEncontrada.set(req.body).save();
      res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.exports = new IAController();
