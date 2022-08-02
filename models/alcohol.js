// const db = require('./../settings/mysqlDb');

// module.exports = db.connect((error) => {
//     if (error) {
//         return console.log(error);
//     }

//     let createDrinksTable = `CREATE TABLE IF NOT EXISTS drinks(
//         id int primary key auto_increment, 
//         userName varchar(255) not null,
//         userId int not null,
//         typeName varchar(255) not null,
//         typeId int not null,
//         categoryName varchar(255) not null,
//         categoryId int not null,
//         drinkName varchar(255) not null, 
//         produced varchar(255) not null
//     )`;

//     db.query(createDrinksTable, (error, result) => {
//         if (error) {
//             return console.log(error);
//         } else {
//             return console.log('alcohol table created');
//         }
//     })
// })
