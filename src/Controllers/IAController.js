const { json } = require("express");
const IAModel = require("../Models/IAModel");

class IAController {
  async create(req, res) {
    try {
      const IA = await IAModel.create(req.body);
      await IA.save();  
      res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }

  async read(req, res) {
    try {
      const IA = await IAModel.read(req.body);
      res.status(200).json(IA);
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
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
      res
        .status(200)
        .json({
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
        return res.status(404).json({ message: "Ferramenta com id " + id + " não encontrada!" });
      const IA = await IAEncontrada.set(req.body).save(); 
      res.status(200).json(IA); 
    } catch (error) {
      res.status(500).json({ message: "ERRO", error: error.message });
    }
  }
}

module.export = new IAController();
module.exports = rotas;
