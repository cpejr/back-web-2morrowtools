const { Router } = require("express");
const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator");
const CategoryFeatureController = require("./Controllers/CategoryFeatureController");
const CategoryFeatureValidator = require("./Validators/CategoryFeatureValidator");
const CategoryPricesController = require("./Controllers/CategoryPricesController");
const CategoryPricesValidator = require("./Validators/CategoryPricesValidator");
const CategoryProfessionController = require("./Controllers/CategoryProfessionController");
const CategoryProfessionValidator = require("./Validators/CategoryProfessionValidator");
const UserController = require("./Controllers/UserController");

const routes = Router();

//User
routes.post("/user", UserController.create);
routes.get("/user/:id?", UserController.read);
routes.delete("/user/:id", UserController.destroy);
routes.put("/user/:id", UserController.update);
routes.put("/user/:id", UserController.updateImage);

// IA
routes.post("/IA", IAValidator.create, IAController.create);
routes.get("/IA/:id?", IAController.read);
routes.delete("/IA/:id", IAValidator.destroy, IAController.destroy);
routes.put("/IA/:id", IAValidator.update, IAController.update);

// CategoryFeature
routes.post(
  "/categoriesfeature",
  CategoryFeatureValidator.create,
  CategoryFeatureController.create
);
routes.get("/categoriesfeature", CategoryFeatureController.read);
routes.delete(
  "/categoriesfeature/:id",
  CategoryFeatureValidator.destroy,
  CategoryFeatureController.destroy
);
routes.put(
  "/categoriesfeature/:id",
  CategoryFeatureValidator.update,
  CategoryFeatureController.update
);
// CategoryPrices
routes.post("/categoriesprices", CategoryPricesValidator.create, CategoryPricesController.create);
routes.get("/categoriesprices", CategoryPricesController.read);
routes.delete(
  "/categoriesprices/:id",
  CategoryFeatureValidator.destroy,
  CategoryPricesController.destroy
);
routes.put(
  "/categoriesprices/:id",
  CategoryFeatureValidator.update,
  CategoryPricesController.update
);

// CategoryProfession
routes.post(
  "/categoriesprofession",
  CategoryProfessionValidator.create,
  CategoryProfessionController.create
);
routes.get("/categoriesprofession", CategoryProfessionController.read);
routes.delete(
  "/categoriesprofession/:id",
  CategoryProfessionValidator.destroy,
  CategoryProfessionController.destroy
);
routes.put(
  "/categoriesprofession/:id",
  CategoryProfessionValidator.update,
  CategoryProfessionController.update
);

module.exports = routes;
