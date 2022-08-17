const db = require('../settings/mysqlDb');

module.exports = db.connect((error) => {
    if (error) {
        console.log(error)
    }

    // let createUsersGroups = `CREATE TABLE IF NOT EXISTS usersGroups(
    //     id int primary key auto_increment, 
    //     groupId int NOT NULL, 
    //     userId int NOT NULL
    //     )`;

    // db.query(createUsersGroups, (error, result) => {
    //     if (error) {
    //         console.log(error)
    //     } else {
    //         console.log('table created')
    //     }
    // })
})