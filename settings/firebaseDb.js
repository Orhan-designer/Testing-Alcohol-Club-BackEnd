// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
    console.log(req.body)
    const email = req.body.email;
    const password = req.body.password;

    const payload = { subject: email };
    const token = jwt.sign(payload, "secretKey");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const password = userCredential.user.reloadUserInfo.passwordHash;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const birthday = req.body.birthday;

            set(ref(database, 'users/' + user.uid), {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName,
                birthday: birthday
            });
            res.status(200).json({ token: token, user: { email, password, firstName, lastName, birthday } });
        })
        .catch((error) => {
            res.status(400).json({
                message: "Cannot register user",
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
                const password = userCredential.user.reloadUserInfo.passwordHash;
                const dt = new Date();

                update(ref(database, "users/" + user.uid), {
                    email: email,
                    last_login: dt,
                });
                res
                    .status(200)
                    .send({ token: token, user: { email: email, password: password } });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "User already exist",
                    error,
                });
            });
    }
};