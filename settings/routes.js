module.exports = (app) => {
    const auth = require('../middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../controllers/usersController');
    const alcoholModel = require('./../controllers/alcoholDescriptionController');

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);
    app.route('/api/add-new-alcohol').post(alcoholModel.newAlcohol);

    app.route('/api/users').get(auth, usersListController.getAllUsers);
}