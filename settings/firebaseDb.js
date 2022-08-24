const jwt = require("jsonwebtoken");
const db = require('./../settings/mysqlDb');
const config = require('./../config/mysqlConfig')

const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref, update } = require("firebase/database");
const { getAuth } = require("firebase/auth");

const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCO7bDyu0Jio0MR-z7oW83xgWYljTMF7nE",
    authDomain: "tasting-club.firebaseapp.com",
    databaseURL: "https://tasting-club-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "tasting-club",
    storageBucket: "tasting-club.appspot.com",
    messagingSenderId: "746523921481",
    appId: "1:746523921481:web:e05edde85542a5c0cd4398",
    measurementId: "G-QZDMTQWEX8"
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

            const selectUser = "SELECT * FROM users WHERE email = '" + email + "'"

            db.query(selectUser, (error, selectUserResult) => {
                if (error) {
                    return res.status(400).send({ error: 'User not found' });
                } else {

                    const userSql = "INSERT INTO users(email, firstName, lastName, birthday) VALUES('" +
                        email + "', '" +
                        firstName + "', '" +
                        lastName + "', '" +
                        birthday + "')";

                    db.query(userSql, (error, result) => {
                        if (error) {
                            return res.send(400).json({ result: error })
                        } else {

                            set(ref(database, 'users/' + user.uid), {
                                email: email,
                            });

                            let id = result.insertId;
                            return res.status(200).json({ message: 'You successfully registered', token: token, user: { id, email, firstName, lastName, birthday } });
                        }
                    })
                }
            })
        })
        .catch((error) => {
            res.status(400).json({
                message: `User with this email ${email} already exists`,
                error,
            });
        });

};

exports.signIn = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign(
        {
            email: email,
        },
        config.jwt,
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
                    res.status(400).send({ message: "Something goes wrong" });
                } else {

                    update(ref(database, "users/" + user.uid), {
                        email: email,
                        last_login: dt,
                    });
                    const userFind = result.find(el => el.email === email)
                    res.status(200).send({ message: 'You successfully sign in', token: token, user: { id: userFind.id, email: email, firstName: userFind.firstName, lastName: userFind.lastName, birthday: userFind.birthday } });
                }
            });
        })
        .catch((error) => {
            res.status(400).send({
                message: "Invalid email or password",
                error,
            });
        });
};