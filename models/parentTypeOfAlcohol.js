const db = require('./../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        return console.log(error);
    }

    // let createUser = `CREATE TABLE IF NOT EXISTS typeOfAlcohol(
    //     id int primary key auto_increment, 
    //     typeOfAlcohol varchar(255) not null,
    //     nameOfAlcohol varchar(255) not null, 
    //     category varchar(255) not null,
    //     alcoholsId int not null
    // )`;

    // db.query(createUser, (error, result) => {
    //     if (error) {
    //         return console.log(error);
    //     } else {
    //         return console.log('type table created');
    //     }
    // })
})