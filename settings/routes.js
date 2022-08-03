module.exports = (app) => {
    const auth = require('../middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../controllers/usersController');
    const drinkModel = require('../controllers/drinkController');
    // const typesOfAlcohol = require('../controllers/typesOfAlcohol');
    const getAlcoholController = require('../controllers/getAlcoholController');
    const test = require('../controllers/testController');

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);
    app.route('/api/add-new-alcohol').post(auth, drinkModel.newDrink);


    app.route('/api/users').get(auth, usersListController.getAllUsers);
    app.route('/api/get-alcohol').get(auth, getAlcoholController.getAlcohol);
    app.route('/api/search/:value').get(test.test);

    app.route('/').get((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        res.send('cors problem fixed:)');
    })
}