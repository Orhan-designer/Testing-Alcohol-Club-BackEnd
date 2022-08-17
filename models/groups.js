const db = require('../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        console.log(error)
    }

    // let createGroups = `CREATE TABLE IF NOT EXISTS allGroups(
    //     id int primary key auto_increment, 
    //     groupName varchar(255) not null, 
    //     userId int not null, 
    //     createAt date not null
    //     )`;

    // db.query(createGroups, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log('table created')
    //     }
    // })
})