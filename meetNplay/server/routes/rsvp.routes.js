const RSVPController = require("../controllers/rsvp.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.post("/api/rsvp", authenticate, RSVPController.createRSVP);
  app.put("/api/rsvp", authenticate, RSVPController.replyRSVP);
  app.get("/api/rsvp/:playdateId", authenticate, RSVPController.getRSVP);
  //  app.get('/api/friend/:id', FriendController.getFriend);
  //app.put('/api/friend/:id', FriendController.updateFriend);
  //app.delete('/api/friend/:id', FriendController.deleteFriend);
};
