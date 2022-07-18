module.exports = (app) => {
    const user = require('./firebaseDb');

    app.route('/api/auth/signup').post(user.signUp);
}