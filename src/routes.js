const { Router } = require("express");
const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator");
const FavoriteController = require("./Controllers/FavoriteController");
const FavoriteValidator = require("./Validators/FavoriteValidator");
const UserController = require("./Controllers/UserController");
const UserValidator = require("./Validators/UserValidator");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const verifyJwt = require("./Middlewares/VerifyJwt");
const verifyUser = require("./Middlewares/VerifyUser");
const CategoryFeatureController = require("./Controllers/CategoryFeatureController");
const CategoryFeatureValidator = require("./Validators/CategoryFeatureValidator");
const CategoryPricesController = require("./Controllers/CategoryPricesController");
const CategoryPricesValidator = require("./Validators/CategoryPricesValidator");
const CategoryProfessionController = require("./Controllers/CategoryProfessionController");
const CategoryProfessionValidator = require("./Validators/CategoryProfessionValidator");

const routes = Router();

// IAs

routes.post("/IA", IAValidator.create, IAController.create);
routes.get("/IA/search-by-category", IAController.filterCategories);
routes.get("/IA/search-by-name", IAController.readByName);
routes.get("/IA/names", IAController.getAllNames);
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
routes.get(
  "/categoriesfeature/search-by-name",
  CategoryFeatureController.readByName
);
routes.get("/categoriesfeature/names", CategoryFeatureController.readNames);
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

routes.post(
  "/categoriesprices",
  CategoryPricesValidator.create,
  CategoryPricesController.create
);
routes.get(
  "/categoriesprices/search-by-name",
  CategoryPricesController.readByName
);
routes.get("/categoriesprices/names", CategoryPricesController.readNames);
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

//Favorites

routes.post("/Favorite", FavoriteValidator.create, FavoriteController.create);
routes.get(
  "/Favorite/:userId?",
  FavoriteValidator.read,
  FavoriteController.read
);
routes.delete(
  "/Favorite/:id",
  FavoriteValidator.destroy,
  FavoriteController.destroy
);
routes.put(
  "/Favorite/:id",
  FavoriteValidator.update,
  FavoriteController.update
);

//User

routes.post("/User", UserValidator.create, UserController.create);
routes.get("/User/:id?", /*verifyJwt, verifyUser,*/ UserController.read);
routes.delete(
  "/User/:id",
  /*verifyJwt, verifyUser,*/ UserValidator.destroy,
  UserController.destroy
);
routes.put(
  "/User/:id",
  /*verifyJwt, verifyUser,*/ UserValidator.update,
  UserController.update
);

//Auth

routes.post("/login", AuthValidator.login, AuthController.login);

// CategoryProfession

routes.post(
  "/categoriesprofession",
  CategoryProfessionValidator.create,
  CategoryProfessionController.create
);
routes.get(
  "/categoriesprofession/search-by-name",
  CategoryProfessionController.readByName
);
routes.get(
  "/categoriesprofession/names",
  CategoryProfessionController.readNames
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
