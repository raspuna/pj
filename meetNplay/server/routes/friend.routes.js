const FriendController = require("../controllers/friend.controller");
const { authenticate } = require("../config/jwt.config");
module.exports = (app) => {
  app.post("/api/friends", authenticate, FriendController.createFriend);
  app.get("/api/friends", authenticate, FriendController.getFriends);
  //  app.get('/api/friend/:id', FriendController.getFriend);
  //app.put('/api/friend/:id', FriendController.updateFriend);
  //app.delete('/api/friend/:id', FriendController.deleteFriend);
};
