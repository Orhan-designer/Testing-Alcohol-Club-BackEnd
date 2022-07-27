const db = require('./../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
       return console.log(error);
    }

    // let createUser = `CREATE TABLE IF NOT EXISTS alcohols(
    //     id int primary key auto_increment, 
    //     userName varchar(255) not null, 
    //     produced varchar(255) not null, 
    //     nameOfAlcohol varchar(255) not null, 
    //     userId int not null
    // )`;

    // db.query(createUser, (error, result) => {
    //     if (error) {
    //         return console.log(error);
    //     } else {
    //         return console.log('alcohol table created');
    //     }
    // })
})
