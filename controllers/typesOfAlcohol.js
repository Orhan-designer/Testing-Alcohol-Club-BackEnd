// const db = require('../settings/mysqlDb');

// exports.typesOfAlcohol = (req, res) => {
//     console.log(req.body)
//     try {
//         const selectFromDrinks = "SELECT typeName FROM drinks";

//         db.query(selectFromDrinks, (error, drinksResult) => {
//             if (error) {
//                 res.status(400).json({ result: error })
//             } else {
//                 console.log(drinksResult)

//                 // const insertInTypesOfAlcohol = "INSERT INTO typesOfAlcohol(typeName) SET typeName = '" + typeName + "'";

//                 // db.query(insertInTypesOfAlcohol, (error, typeOfAlcoholResult) => {
//                 //     if (error) {
//                 //         res.status(400).json({ result: error })
//                 //     } else {
//                 //         console.log(typeOfAlcoholResult)
//                 //         res.status(200).json({ message: 'typeName added in table', result: typeOfAlcoholResult });
//                 //     }
//                 // })
//             }
//         })
//     } catch (error) {
//         res.status(400).json({ result: error });
//     }

// }