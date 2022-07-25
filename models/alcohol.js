const db = require('./../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        console.log(error)
    }

    // let createUser = `CREATE TABLE IF NOT EXISTS alcohols(id int primary key auto_increment, 
    //     userName VARCHAR(255) NOT NULL, type VARCHAR(255) NOT NULL, produced VARCHAR(255) NOT NULL, 
    //     nameOfAlcohol VARCHAR(255) NOT NULL, alcoholContent VARCHAR(255) NOT NULL)`

    // db.query(createUser, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log('table created')
    //     }
    // })
})
