const db = require('./../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        console.log(error)
    }

    // let createUser = `CREATE TABLE IF NOT EXISTS typeOfAlcohol(id int primary key auto_increment, 
    //     name varchar(255) not null, alcoholsId int not null)`;

    // db.query(createUser, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log('table created')
    //     }
    // })
})