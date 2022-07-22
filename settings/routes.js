module.exports = (app) => {
    const auth = require('../Middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../Controllers/usersController')

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);

    app.route('/api/users').get(auth, usersListController.getAllUsers);
    
}