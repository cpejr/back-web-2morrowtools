import { Router } from "express";

const IAModelController = require("./Controllers/IAController");

const rotas = Router();
rotas.post("/IA", IAModelController.create);
module.exports = rotas;
