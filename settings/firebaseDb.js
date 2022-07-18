// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { initializeApp } = require("firebase/app");
const { getDatabase, set, ref } = require("firebase/database");
const { getAuth } = require("firebase/auth");

const {
    createUserWithEmailAndPassword,
    /* signInWithEmailAndPassword, */
} = require("firebase/auth");

const firebaseConfig = {
    apiKey: "AIzaSyCFt_xPe1jT0lVJNNbN6QuY9MiLv2RFwjo",
    authDomain: "alcohol-testing-club.firebaseapp.com",
    databaseURL: "https://alcohol-testing-club-default-rtdb.firebaseio.com",
    projectId: "alcohol-testing-club",
    storageBucket: "alcohol-testing-club.appspot.com",
    messagingSenderId: "838324151844",
    appId: "1:838324151844:web:1cda3f45abc660dd909ab1",
    measurementId: "G-M0MZL7DHWM"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

exports.signUp = (req, res) => {
    console.log(req.body)
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const birthDay = req.body.birthDate;
    const email = req.body.email;
    const password = req.body.password;

    const payload = { subject: email };
    const token = jwt.sign(payload, "secretKey");

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const password = userCredential.user.reloadUserInfo.passwordHash;

            set(ref(database, "users/" + user.uid), {
                firstName: firstName,
                lastName: lastName,
                birthDay: birthDay,
                email: email,
            });
            res.status(200).json({ token: token, user: { firstName, lastName, birthDay, email, password } });
        })
        .catch((error) => {
            res.status(400).json({
                message: "Cannot register user",
                error,
            });
        });
};

