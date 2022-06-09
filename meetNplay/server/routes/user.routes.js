const UserController = require("../controllers/user.controller");
module.exports = (app) => {
  app.post("/api/user/login", UserController.login);
  app.post("/api/users", UserController.createUser);
  app.get("/api/users", UserController.getUsers);
  app.get("/api/user/:id", UserController.getUser);
  app.post("/api/searchUser", UserController.searchUser);
  app.put("/api/user/:id", UserController.updateUser);
  app.delete("/api/user/:id", UserController.deleteUser);
};
