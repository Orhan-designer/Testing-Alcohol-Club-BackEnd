const db = require('./../settings/mysqlDb');

exports.createNewGroup = (req, res) => {
    try {
        const userId = req.body.userId;
        const groupName = req.body.groupName;

        if (!groupName) {
            return res.status(400).json({ error: 'Please enter group name' });
        }

        const createGroup = "INSERT INTO allGroups SET groupName = '" + groupName + "', userId = '" + userId + "'";

        db.query(createGroup, (error, result) => {
            if (error) {
                return res.status(400).json({ error: error });
            } else {
                return res.status(200).json({ message: 'Group was created', result });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}