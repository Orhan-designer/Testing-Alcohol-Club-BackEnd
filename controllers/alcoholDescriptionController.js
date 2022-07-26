const db = require('../settings/mysqlDb');

exports.newAlcohol = (req, res) => {
    try {
        const selectFromAlcohols = "SELECT id FROM users";

        db.query(selectFromAlcohols, (error, alcoholResult) => {
            if (error) {
                return { result: error };
            } else {
                const result = alcoholResult.find(el => el.id);
                const userId = result.id;
                const userName = req.body.userName;
                const type = req.body.type;
                const produced = req.body.produced;
                const nameOfAlcohol = req.body.nameOfAlcohol;
                const alcoholContent = req.body.alcoholContent;

                const users = "INSERT INTO alcohols SET userName = '" + userName + "', type = '" + type + "', produced = '" + produced + "', nameOfAlcohol = '" +
                    nameOfAlcohol + "', alcoholContent = '" + alcoholContent + "', userId = '" + userId + "'";

                db.query(users, (error, result) => {
                    if (error) {
                        return { message: error };
                    } else {
                        console.log(result)
                        res.status(200).json({ result: result, message: 'Drink successfully created' });
                    }
                })
            }
        })

    } catch (error) {
        res.status(400).json({ message: error });
    }

}