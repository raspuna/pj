const UserController = require("../controllers/user.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.post("/api/user/login", UserController.login);
  app.get("/api/user/logout", UserController.logout);
  app.post("/api/users", UserController.createUser);
  app.get("/api/users", authenticate, UserController.getUsers);
  app.get("/api/user/:id", UserController.getUser);
  app.post("/api/searchUser", authenticate, UserController.searchUser);
  app.put("/api/user/:id", UserController.updateUser);
  app.delete("/api/user/:id", UserController.deleteUser);
};
