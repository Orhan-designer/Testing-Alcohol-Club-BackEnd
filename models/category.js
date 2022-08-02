// const db = require('../settings/mysqlDb');

// module.exports = db.connect((error) => {
//     if (error) {
//         return console.log(error);
//     }

//     let createCategoryOfAlcohol = `CREATE TABLE IF NOT EXISTS categoryOfType(
//         id int primary key auto_increment, 
//         categoryName varchar(255) not null,
//         typeId int not null
//     )`;

//     db.query(createCategoryOfAlcohol, (error, result) => {
//         if (error) {
//             return console.log(error);
//         } else {
//             return console.log('category table created');
//         }
//     })
// })