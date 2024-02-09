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
const PostController = require("./Controllers/PostController");
const PostValidator = require("./Validators/PostValidator");

const routes = Router();

// User

routes.get("/User/getAll", UserController.readAll);
routes.post("/User", UserValidator.create, UserController.create);
routes.get("/User/:id?", UserController.read);
routes.delete("/User/:id", UserValidator.destroy, UserController.destroy);
routes.put("/User/:id", UserValidator.update, UserController.update);
routes.get("/userImage/:id", UserController.takeImage);

// Auth

routes.post("/login", AuthValidator.login, AuthController.login);

// IAs

routes.post("/IA", verifyJwt, verifyIsAdm, IAValidator.create, IAController.create);
routes.get("/IA/search-by-category", IAController.filterCategories);
routes.get("/IA/search-by-name", IAController.readByName);
routes.get("/IA/names", IAController.getAllNames);
routes.get("/IA/:id?", IAController.read);
routes.delete("/IA/:id", verifyJwt, verifyIsAdm, IAValidator.destroy, IAController.destroy);
routes.put("/IA/:id", verifyJwt, verifyIsAdm, IAValidator.update, IAController.update);
routes.post("/IAImage", IAValidator.readImage, IAController.readImage);

// CategoryFeature

routes.post(
  "/categoriesfeature",
  verifyJwt,
  verifyIsAdm,
  CategoryFeatureValidator.create,
  CategoryFeatureController.create
);
routes.get("/categoriesfeature", CategoryFeatureController.read);
routes.get("/categoriesfeature/search-by-name", CategoryFeatureController.readByName);
routes.get("/categoriesfeature/names", CategoryFeatureController.readNames);
routes.delete(
  "/categoriesfeature/:id",
  verifyJwt,
  verifyIsAdm,
  CategoryFeatureValidator.destroy,
  CategoryFeatureController.destroy
);
routes.put(
  "/categoriesfeature/:id",
  verifyJwt,
  verifyIsAdm,
  CategoryFeatureValidator.update,
  CategoryFeatureController.update
);

// CategoryPrices

routes.post(
  "/categoriesprices",
  verifyJwt,
  verifyIsAdm,
  CategoryPricesValidator.create,
  CategoryPricesController.create
);
routes.get("/categoriesprices/search-by-name", CategoryPricesController.readByName);
routes.get("/categoriesprices/names", CategoryPricesController.readNames);
routes.get("/categoriesprices", CategoryPricesController.read);
routes.delete(
  "/categoriesprices/:id",
  verifyJwt,
  verifyIsAdm,
  CategoryFeatureValidator.destroy,
  CategoryPricesController.destroy
);
routes.put(
  "/categoriesprices/:id",
  verifyJwt,
  verifyIsAdm,
  CategoryFeatureValidator.update,
  CategoryPricesController.update
);

//Favorites

routes.post("/Favorite", FavoriteValidator.create, FavoriteController.create);
routes.get("/Favorite/:userId?", FavoriteValidator.read, FavoriteController.read);
routes.delete("/Favorite/:id", FavoriteValidator.destroy, FavoriteController.destroy);
routes.put("/Favorite/:id", FavoriteValidator.update, FavoriteController.update);
routes.delete(
  "/FavoriteByIds/:userId/:toolId",
  verifyJwt,
  FavoriteValidator.destroyByIds,
  FavoriteController.destroyByIds
);

// CategoryProfession

routes.post(
  "/categoriesprofession",
  verifyJwt,
  verifyIsAdm,
  CategoryProfessionValidator.create,
  CategoryProfessionController.create
);
routes.get("/categoriesprofession/search-by-name", CategoryProfessionController.readByName);
routes.get("/categoriesprofession/names", CategoryProfessionController.readNames);
routes.get("/categoriesprofession", CategoryProfessionController.read);
routes.delete(
  "/categoriesprofession/:id",
  verifyJwt,
  verifyIsAdm,
  CategoryProfessionValidator.destroy,
  CategoryProfessionController.destroy
);
routes.put(
  "/categoriesprofession/:id",
  verifyJwt,
  verifyIsAdm,
  CategoryProfessionValidator.update,
  CategoryProfessionController.update
);
// Comment
routes.post("/comment", CommentValidator.create, CommentController.create);
routes.get("/comment/:id_ia", CommentController.read);
routes.delete("/comment/:id", CommentValidator.destroy, CommentController.destroy);
routes.put("/comment/:id", CommentValidator.update, CommentController.update);

//Avaliation
routes.post("/avaliation", AvaliationValidator.create, AvaliationController.create);
routes.get("/avaliation/ID", AvaliationController.getUserAvaliation);
routes.get("/avaliation/check/:iaId", AvaliationController.getTrueFalse);
routes.get("/avaliation/userCheck/:iaId", AvaliationController.getUserHasRated);
routes.get("/avaliation", AvaliationValidator.read, AvaliationController.read);
routes.delete("/avaliation/:id", AvaliationValidator.destroy, AvaliationController.destroy);
routes.put("/avaliation/:id", AvaliationValidator.update, AvaliationController.update);
routes.get("/avaliation/:iaId", AvaliationController.getByIaId);
routes.delete("/avaliation", AvaliationController.destroyAll);

// Post
routes.post("/posts",  PostValidator.create, PostController.create);
routes.delete("/posts/:id",  PostController.destroy);
routes.put("/posts/:id",  PostValidator.update, PostController.update);
routes.get("/posts", PostController.read);
routes.get("/posts/names", PostController.getAllNames);

module.exports = routes;
