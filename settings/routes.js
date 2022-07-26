module.exports = (app) => {
    const auth = require('../middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../controllers/usersController');
    const alcoholModel = require('./../controllers/alcoholDescriptionController');
    const getAlcohol = require('../controllers/getAlcoholController');

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);
    app.route('/api/add-new-alcohol').post(alcoholModel.newAlcohol);

    app.route('/api/users').get(auth, usersListController.getAllUsers);
    app.route('/api/get-alcohol').get(auth, getAlcohol.getAlcohol);

    app.route('/').get((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        res.send('cors problem fixed:)')
    })
}