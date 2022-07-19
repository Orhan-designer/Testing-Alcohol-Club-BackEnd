module.exports = (app) => {
    const userCreateForFirebase = require('./firebaseDb');

    app.route('/api/auth/signup').post(userCreateForFirebase.signUp);
    app.route('/api/auth/signin').post(userCreateForFirebase.signIn);

}