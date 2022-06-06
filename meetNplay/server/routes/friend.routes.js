const FriendController = require('../controllers/friend.controller');
module.exports = (app) => {
    app.post('/api/friends', FriendController.createFriend);
    app.get('/api/friends', FriendController.getFriends);
    app.get('/api/friend/:id', FriendController.getFriend);
    app.put('/api/friend/:id', FriendController.updateFriend);
    app.delete('/api/friend/:id', FriendController.deleteFriend);

};