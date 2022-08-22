const db = require('../settings/mysqlDb');

exports.getAllGroups = (req, res) => {
    try {
        const userId = req.params.id;
        const users = "SELECT * FROM allGroups WHERE userId = '" + userId + "'";

        db.query(users, (error, result) => {
            if (error) {
                res.status(400).json({ error: 'Group not found' });
            } else {
                res.status(200).json({ mesage: 'Group found', result: result });
            }
        })
    } catch (error) {
        res.status(400).json({ error: error });
    }
}