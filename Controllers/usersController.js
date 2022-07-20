const db = require('./../settings/mysqlDb');

exports.getAllUsers = (req, res) => {
    console.log(req.body)
    try {
        const users = "SELECT * FROM users"; //get all users from table

        db.query(users, (error, result) => {
            if (error) {
                res.status(400).json({ message: error });
            } else {
                console.log(result)
                res.status(200).json({ result: result });
            }
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }
}
