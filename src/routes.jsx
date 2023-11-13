import { Router } from "express";

const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator").default;
const ToolCategoryController = require("./Controllers/ToolCategoryController");
const ToolCategoryValidator =
  require("./Validators/ToolCategoryValidator").default;

const rotas = Router();

//IA
rotas.post("/IA", IAValidator.create, IAController.create);
rotas.get("/IA", IAController.read);
rotas.delete("/IA/:id", IAValidator.destroy, IAController.destroy);
rotas.update("/IA/:id", IAValidator.update, IAController.update);

//category
rotas.post(
  "/categorias",
  ToolCategoryValidator.create,
  ToolCategoryController.create
);
rotas.get("/categorias", ToolCategoryController.read);
rotas.delete(
  "/categorias/:id",
  ToolCategoryValidator.destroy,
  ToolCategoryController.destroy
);
rotas.update(
  "/categorias/:id",
  ToolCategoryValidator.update,
  ToolCategoryController.update
);

module.exports = rotas;
