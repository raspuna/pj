const UserController = require('../controllers/user.controller');
module.exports = (app) => {
    app.post('/api/users', UserController.createUser);
    app.get('/api/users', UserController.getUsers);
    app.get('/api/user/:id', UserController.getUser);
    app.put('/api/user/:id', UserController.updateUser);
    app.delete('/api/user/:id', UserController.deleteUser);
};