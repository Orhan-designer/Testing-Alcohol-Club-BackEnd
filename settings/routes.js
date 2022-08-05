module.exports = (app) => {
    const auth = require('../middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../controllers/usersController');
    const getByCategoriesController = require('../controllers/getByCategoriesController');
    const getByIdController = require('../controllers/getByIdController');
    const createNewDrinkController = require('../controllers/createNewDrinkController');
    const updateReviewAndRatingController = require('../controllers/updateReviewAndRatingController');

    /* CRUD API for users */
    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);
    app.route('/api/users').get(auth, usersListController.getAllUsers);
    /* *********** */

    /* Post API for create new drink */
    app.route('/api/add-new-alcohol').post(createNewDrinkController.createNewDrink);
    /* *********** */

    /* Get API for getting drinks by categories and id's */
    app.route('/api/get-by-category/:value').get(getByCategoriesController.getByCategory);
    app.route('/api/get-by-id/:id').get(getByIdController.getById);
    /* *********** */

    /* Update API for ratings, reviews and data of degustation */
    app.route('/api/update/:id').put(updateReviewAndRatingController.updateReviewAndRating);
    /* *********** */

    app.route('/').get((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        res.send('cors problem fixed:)');
    })
}