const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const db = require('./../settings/mysqlDb');
const config = require('./../config/mysqlConfig');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //we take the token that saves in headers.
    secretOrKey: config.jwt
};

module.exports = (passport) => {
    passport.use(
        new JwtStrategy(options, (payload, done) => {
            try {
                const user = "SELECT id, email FROM users WHERE id = '" + payload.id + "'";

                db.query(user, (error, result) => {
                    if (error) {
                        res.status(400).json({ message: error })
                    } else {
                        const user = result;

                        if (user) {
                            done(null, user);
                        } else {
                            done(null, false);
                        }
                    }
                });
            } catch (error) {
                res.status(400).json({ message: error });
            }
        })
    )
}