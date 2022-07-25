module.exports = (app) => {
    const auth = require('../middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../controllers/usersController')

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);

    app.route('/api/users').get(auth, usersListController.getAllUsers);

    app.route('/').get((req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.header('Access-Control-Allow-Credentials', true); // If needed

        res.send('cors problem fixed:)')
    })

}