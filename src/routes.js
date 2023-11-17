const { Router } = require("express");
const IAController = require("./Controllers/IAController");
const IAValidator = require("./Validators/IAValidator");
const ToolCategoryController = require("./Controllers/ToolCategoryController");
const ToolCategoryValidator = require("./Validators/ToolCategoryValidator");
const UserController = require("./Controllers/UserController");
const UserValidator = require("./Validators/UserValidator");
const AuthController = require("./Controllers/AuthController");
const AuthValidator = require("./Validators/AuthValidator");
const verifyJwt = require("./Middlewares/VerifyJwt");
const verifyUser = require("./Middlewares/VerifyUser");

const routes = Router();

// IA
routes.post("/IA", IAValidator.create, IAController.create);
routes.get("/IA/:id?", IAController.read);
routes.delete("/IA/:id", IAValidator.destroy, IAController.destroy);
routes.put("/IA/:id", IAValidator.update, IAController.update);

// Category
routes.post(
  "/categories",
  ToolCategoryValidator.create,
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

//User
routes.post("/User", UserValidator.create, UserController.create);
routes.get("/User/:id?", verifyJwt, verifyUser, UserController.read);
routes.delete("/User/:id", verifyJwt, verifyUser, UserValidator.destroy, UserController.destroy);
routes.put("/User/:id", verifyJwt, verifyUser, UserValidator.update, UserController.update);

//Auth

routes.post("/login", AuthValidator.login, AuthController.login);

module.exports = routes;