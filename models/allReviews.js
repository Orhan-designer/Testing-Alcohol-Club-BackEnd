const db = require('../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        console.log(error)
    }

    // let createAllReviews = `CREATE TABLE IF NOT EXISTS allReviews(
    //     id int primary key auto_increment, 
    //     mongoId int not null,
    //     userId int not null,
    //     rating varchar(255) not null, 
    //     feedBack varchar(255) not null, 
    //     dateOfDegustation date not null
    //     )`;

    // db.query(createAllReviews, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log('table created')
    //     }
    // })
})