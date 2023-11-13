const { json } = require("express");
const IAModel = require("../Models/IAModel");

class IAModelController {
  async create(req, res) {
    const IA = await IAModel.create(req.body);

    return res.status(200).json(IA);
  }
  async read(req, res) {
    const IA = await IAModel.read(req.body);

    return res.status(200).json(IA);
  }
  async delet(req, res) {
    const IA = await IAModel.delet(req.body);

    return res.status(200).json(IA);
  }
  async update(req, res) {
    const IA = await IAModel.update(req.body);

    return res.status(200).json(IA);
  }
}

module.export = new IAModelController();
module.exports = rotas;
