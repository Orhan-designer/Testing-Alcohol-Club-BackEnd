const db = require('../settings/mysqlDb');

exports.newAlcohol = (req, res) => {
    try {
        const userName = req.body.userName;
        const type = req.body.type;
        const produced = req.body.produced;
        const nameOfAlcohol = req.body.nameOfAlcohol;
        const alcoholContent = req.body.alcoholContent;

        const users = "INSERT INTO alcohols(userName, type, produced, nameOfAlcohol, alcoholContent) VALUES('" +
            userName + "', '" +
            type + "', '" +
            produced + "', '" +
            nameOfAlcohol + "', '" +
            alcoholContent + "')";

        db.query(users, (error, result) => {
            if (error) {
                return { message: error }
            } else {
                res.status(200).json({ result: result, message: 'Drink successfully added' });
            }
        })
    } catch (error) {
        res.status(400).json({ message: error });
    }

}