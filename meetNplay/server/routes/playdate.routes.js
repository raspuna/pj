const PlaydateController = require("../controllers/playdate.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/playdates", authenticate, PlaydateController.createPlaydate);
};
