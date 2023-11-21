const { Router } = require("express");
const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator");
const ToolCategoryController = require("./Controllers/ToolCategoryController");
const ToolCategoryValidator = require("./Validators/ToolCategoryValidator");
const FavoriteController = require("./Controllers/FavoriteController");
const FavoriteValidator = require("./Validators/FavoriteValidator");

const routes = Router();

// IA
routes.post("/IA", IAValidator.create, IAController.create);
routes.get("/IA/:id?", IAController.read);
routes.delete("/IA/:id", IAValidator.destroy, IAController.destroy);
routes.put("/IA/:id", IAValidator.update, IAController.update);

// Category
routes.post(
  "/categories",
  FavoriteValidator.create,
  ToolCategoryController.create
);
routes.get("/categories", ToolCategoryController.read);
routes.delete(
  "/categories/:id",
  ToolCategoryValidator.destroy,
  ToolCategoryController.destroy
);
routes.put(
  "/categories/:id",
  ToolCategoryValidator.update,
  ToolCategoryController.update
);

//Favorites
routes.post("/Favorite", FavoriteValidator.create, FavoriteController.create);
routes.get("/Favorite/:id?", FavoriteController.read);
routes.delete("/Favorite/:id", FavoriteValidator.destroy, FavoriteController.destroy);
routes.put("/Favorite/:id", FavoriteValidator.update, FavoriteController.update);

module.exports = routes;
