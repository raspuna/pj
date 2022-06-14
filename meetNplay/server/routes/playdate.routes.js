const PlaydateController = require("../controllers/playdate.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/playdates", authenticate, PlaydateController.createPlaydate);
  app.get("/api/playdates", authenticate, PlaydateController.getPlaydates);
  app.get("/api/playdate/:id", authenticate, PlaydateController.getPlaydate);
};
