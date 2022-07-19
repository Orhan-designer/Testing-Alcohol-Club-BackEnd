// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require('./../settings/mysqlDb');

const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, update } = require("firebase/database");
const { getAuth } = require("firebase/auth");

const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCvk-WvSpwt3mFGAGl5vUKdSXekdr9Eotc",
    authDomain: "testing-alcohol-club-f6e1d.firebaseapp.com",
    databaseURL: "https://testing-alcohol-club-f6e1d-default-rtdb.firebaseio.com",
    projectId: "testing-alcohol-club-f6e1d",
    storageBucket: "testing-alcohol-club-f6e1d.appspot.com",
    messagingSenderId: "161740699903",
    appId: "1:161740699903:web:90eefd850c130458e0b4ca",
    // measurementId: "G-7YHM95B8DK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

exports.signUp = (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthday = req.body.birthday;
    const email = req.body.email;
    const password = req.body.password;

    const payload = { subject: email };
    const token = jwt.sign(payload, "secretKey");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // const password = userCredential.user.reloadUserInfo.passwordHash;

            const selectUser = "SELECT id, email, firstName, lastName, birthday FROM users WHERE email = '" + email + "'"

            db.query(selectUser, (error, selectUserResult) => {
                if (error) {
                    res.status(400).send(error)
                } else if (typeof selectUserResult !== 'undefined' && selectUserResult.length > 0) {
                    const row = JSON.parse(JSON.stringify(selectUserResult))

                    row.map(() => {
                        res.status(302, { error: `user with this email ${email} already exists` }, res)
                        return true;
                    })
                } else {
                    const userSql = "INSERT INTO users(email, firstName, lastName, birthday) VALUES('" +
                        email + "', '" +
                        firstName + "', '" +
                        lastName + "', '" +
                        birthday + "')";

                    db.query(userSql, (error, result) => {
                        if (error) {
                            res.send(400).json({ result: error })
                        } else {
                            return result;
                        }
                    })

                    set(ref(database, 'users/' + user.uid), {
                        email: email,
                    });
                    res.status(200).json({ message: 'User successfully registered', token: `Bearer ${token}`, user: { email, firstName, lastName, birthday } });
                }
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: "User already exists",
                error,
            });
        });

};

exports.signIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (password) {
        const token = jwt.sign(
            {
                email: email,
            },
            "supersecret",
            {
                expiresIn: 120 * 120,
            }
        );

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // const password = userCredential.user.reloadUserInfo.passwordHash;
                const dt = new Date();

                const userSql = `SELECT * FROM users`;

                db.query(userSql, (error, result) => {
                    if (error) {
                        console.log(error)
                    } else {
                        res.status(200).send({ message: 'User successfully sign in', token: `Bearer ${token}`, user: { email: email, firstName: result[0].firstName, lastName: result[0].lastName, birthday: result[0].birthday } });
                    }
                })

                update(ref(database, "users/" + user.uid), {
                    email: email,
                    last_login: dt,
                });

            })
            .catch((error) => {
                res.status(400).send({
                    message: "Invalid email or password",
                    error,
                });
            });
    }
};