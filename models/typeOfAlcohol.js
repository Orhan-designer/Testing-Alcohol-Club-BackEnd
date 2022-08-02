// const db = require('../settings/mysqlDb');

// module.exports = db.connect((error) => {
//     if (error) {
//         return console.log(error);
//     }

//     let createTypeOfAlcohol = `CREATE TABLE IF NOT EXISTS typesOfAlcohol(
//         id int primary key auto_increment, 
//         typeName varchar(255) not null
//     )`;

//     db.query(createTypeOfAlcohol, (error, result) => {
//         if (error) {
//             return console.log(error);
//         } else {
//             return console.log('type table created');
//         }
//     })
// })