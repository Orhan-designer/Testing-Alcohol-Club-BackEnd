module.exports = (app) => {
    const auth = require('../middleware/auth');
    const userCreateForFirebase = require('./firebaseDb');
    const usersListController = require('../controllers/usersController');
    const getByCategoriesController = require('../controllers/getByCategoriesController');
    const getByIdController = require('../controllers/getByIdController');
    const createNewDrinkController = require('../controllers/createNewDrinkController');
    const updateReviewAndRatingController = require('../controllers/updateReviewAndRatingController');
    const getShortInfoAboutDrinkController = require('../controllers/getShortInfoAboutDrinkController');

    /* CRUD API for users */
    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);
    app.route('/api/users').get(auth, usersListController.getAllUsers);
    /* *********** */

    /* Post API for create new drink */
    app.route('/api/add-new-alcohol').post(/* here should be auth middleware */createNewDrinkController.createNewDrink);
    /* *********** */

    /* Get API for getting drinks by categories and id's */
    app.route('/api/get-by-category/:value').get(/* here should be auth middleware */getByCategoriesController.getByCategory);
    app.route('/api/get-by-id/:id').get(/* here should be auth middleware */getByIdController.getById);
    app.route('/api/get-short-info').get(/* here should be auth middleware */getShortInfoAboutDrinkController.getShortInfoAboutDrink);
    /* *********** */

    /* Update API for ratings, reviews and data of degustation */
    app.route('/api/update/:id').put(/* here should be auth middleware */updateReviewAndRatingController.updateReviewAndRating);
    /* *********** */

    app.route('/').get((req, res) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
        res.setHeader('Access-Control-Allow-Credentials', true); // If needed

        res.send('cors problem fixed:)');
    })
}