module.exports = (app) => {
    const userCreateForFirebase = require('./firebaseDb');
    const userCreateForMysql = require('./../Controllers/usersController');

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    // app.route('/api/auth/signup').post(userCreateForMysql.signUp)
    // app.route('/api/auth/signin').post(userCreateForFirebase.signIn);

}