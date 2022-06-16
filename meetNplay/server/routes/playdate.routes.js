const PlaydateController = require("../controllers/playdate.controller");
const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  app.post("/api/playdates", authenticate, PlaydateController.createPlaydate);
  app.get("/api/playdates", authenticate, PlaydateController.getPlaydates);
  app.get(
    "/api/playdates/invited",
    authenticate,
    PlaydateController.getInvitedPlaydates
  );
  app.get("/api/playdate/:id/rsvps", authenticate, PlaydateController.getRsvps);
  app.get("/api/playdate/:id", authenticate, PlaydateController.getPlaydate);
  app.put("/api/playdate/:id", authenticate, PlaydateController.updatePlaydate);
  app.delete(
    "/api/playdate/:id",
    authenticate,
    PlaydateController.deletePlaydate
  );
};
