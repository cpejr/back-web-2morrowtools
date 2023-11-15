const { Router } = require("express");
const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator");
const ToolCategoryController = require("./Controllers/ToolCategoryController");
const ToolCategoryValidator = require("./Validators/ToolCategoryValidator");

const rotas = Router();

//IA
// rotas.post("/IA", IAValidator.create, IAController.create);
rotas.post("/IA", IAValidator.create, IAController.create);
rotas.get("/IA", IAController.read);
rotas.delete("/IA/:id", IAValidator.destroy, IAController.destroy);
rotas.put("/IA/:id", IAValidator.update, IAController.update);

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
rotas.put(
  "/categorias/:id",
  ToolCategoryValidator.update,
  ToolCategoryController.update
);

module.exports = rotas;
