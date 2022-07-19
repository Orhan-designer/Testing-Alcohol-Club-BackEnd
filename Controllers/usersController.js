// const db = require('./../settings/mysqlDb');

// exports.signUp = (req, res) => {
//     console.log('hi')
//     const email = req.body.email;
//     const firstName = req.body.firstName;
//     const lastName = req.body.lastName;
//     const birthday = req.body.birthday;

//     const userSql = "INSERT INTO users(email, firstName, lastName, birthday) VALUES('" +
//         email + "', '" +
//         firstName + "', '" +
//         lastName + "', '" +
//         birthday + "')";

//     db.query(userSql, (error, result) => {
//         if (error) {
//             console.log(error)
//         } else {
//             console.log('user created')
//             res.status(200).json({ email, firstName, lastName, birthday })
//         }

//     })
// }


