const { Router } = require("express");
const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator");
const FavoriteController = require("./Controllers/FavoriteController");
const FavoriteValidator = require("./Validators/FavoriteValidator");
const UserController = require("./Controllers/UserController");
const UserValidator = require("./Validators/UserValidator");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
// const verifyJwt = require("./Middlewares/VerifyJwt");
// const verifyUser = require("./Middlewares/VerifyUser");
const verifyIsAdm = require("./Middlewares/VerifyIsAdm");
const CategoryFeatureController = require("./Controllers/CategoryFeatureController");
const CategoryFeatureValidator = require("./Validators/CategoryFeatureValidator");
const CategoryPricesController = require("./Controllers/CategoryPricesController");
const CategoryPricesValidator = require("./Validators/CategoryPricesValidator");
const CategoryProfessionController = require("./Controllers/CategoryProfessionController");
const CategoryProfessionValidator = require("./Validators/CategoryProfessionValidator");
const CommentValidator = require("./Validators/CommentValidator");
const CommentController = require("./Controllers/CommentController");
const AvaliationValidator = require("./Validators/AvaliationValidator");
const AvaliationController = require("./Controllers/AvaliationController");
const BlogController = require("./Controllers/BlogController");
const BlogValidator = require("./Validators/BlogValidator");

const routes = Router();

// User

routes.post("/User", UserValidator.create, UserController.create);
routes.get("/User/:id?", UserController.read);
routes.delete(
  "/User/:id",
  // verifyJwt,
  // verifyUser,
  UserValidator.destroy,
  UserController.destroy
);
routes.put(
  "/User/:id",
  // verifyJwt,
  // verifyUser,
  UserValidator.update,
  UserController.update
);

// Auth

routes.post("/login", AuthValidator.login, AuthController.login);

// IAs

routes.post("/IA", verifyIsAdm, IAValidator.create, IAController.create);
routes.get("/IA/search-by-category", IAController.filterCategories);
routes.get("/IA/search-by-name", IAController.readByName);
routes.get("/IA/names", IAController.getAllNames);
routes.get("/IA/:id?", IAController.read);
routes.delete(
  "/IA/:id",
  verifyIsAdm,
  IAValidator.destroy,
  IAController.destroy
);
routes.put("/IA/:id", verifyIsAdm, IAValidator.update, IAController.update);

// CategoryFeature

routes.post(
  "/categoriesfeature",
  verifyIsAdm,
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
  verifyIsAdm,
  CategoryFeatureValidator.destroy,
  CategoryFeatureController.destroy
);
routes.put(
  "/categoriesfeature/:id",
  verifyIsAdm,
  CategoryFeatureValidator.update,
  CategoryFeatureController.update
);

// CategoryPrices

routes.post(
  "/categoriesprices",
  verifyIsAdm,
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
  verifyIsAdm,
  CategoryFeatureValidator.destroy,
  CategoryPricesController.destroy
);
routes.put(
  "/categoriesprices/:id",
  verifyIsAdm,
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

// CategoryProfession

routes.post(
  "/categoriesprofession",
  verifyIsAdm,
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
  verifyIsAdm,
  CategoryProfessionValidator.destroy,
  CategoryProfessionController.destroy
);
routes.put(
  "/categoriesprofession/:id",
  verifyIsAdm,
  CategoryProfessionValidator.update,
  CategoryProfessionController.update
);
// Comment
routes.post("/comment", CommentValidator.create, CommentController.create);
routes.get("/comment/:id_ia", CommentController.read);
routes.delete(
  "/comment/:id",
  CommentValidator.destroy,
  CommentController.destroy
);
routes.put("/comment/:id", CommentValidator.update, CommentController.update);

//Avaliation
routes.post(
  "/avaliation",
  AvaliationValidator.create,
  AvaliationController.create
);
routes.get("/avaliation", AvaliationValidator.read, AvaliationController.read);
routes.delete(
  "/avaliation/:id",
  AvaliationValidator.destroy,
  AvaliationController.destroy
);
routes.put(
  "/avaliation/:id",
  AvaliationValidator.update,
  AvaliationController.update
);
routes.get("/avaliation/:iaId", AvaliationController.getByIaId);
routes.delete("/avaliation", AvaliationController.destroyAll);

// Blog
routes.post("/blog", BlogValidator.create, BlogController.create);
routes.delete("/blog", BlogController.destroy);
routes.put("/blog", BlogValidator.update, BlogController.update);
routes.get("/blog", BlogController.read);
routes.get("/blog/names", BlogController.getAllNames);


module.exports = routes;