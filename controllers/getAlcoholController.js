// const db = require('../settings/mysqlDb');

// exports.getAlcohol = (req, res) => {
//     try {
//         const users = "SELECT * FROM typeOfAlcohol"

//         db.query(users, (error, result) => {
//             if (error) {
//                 return { message: error }
//             } else {
//                 res.status(200).send({ result: result, message: 'Find' });
//             }
//         })
//     } catch (error) {
//         res.status(400).json({ message: error });
//     }

// }