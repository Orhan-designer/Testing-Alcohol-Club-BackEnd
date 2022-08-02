const db = require('./../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        return console.log(error);
    }

    // let createDrinksTable = `CREATE TABLE IF NOT EXISTS drinksRating(
    //     id int primary key auto_increment,
    //     mongoId int not null,
    //     userName varchar(255) not null,
    //     rating varchar(255) not null,
    //     descriptionAboutDrink varchar(255) not null,
    //     dateOfDegustation varchar(255) not null
    // )`;

    // db.query(createDrinksTable, (error, result) => {
    //     if (error) {
    //         return console.log(error);
    //     } else {
    //         return console.log('drinks table created');
    //     }
    // })
})