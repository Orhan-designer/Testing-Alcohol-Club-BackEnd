const db = require('../settings/mysqlDb');

exports.newAlcohol = (req, res) => {
    try {
        const selectFromAlcohols = "SELECT id, firstName FROM users";

        db.query(selectFromAlcohols, (error, alcoholResult) => {
            if (error) {
                return { result: error };
            } else {
                const result = alcoholResult.find(el => el.id && el.firstName);
                console.log(result)
                const userId = result.id;
                const userName = result.firstName;
                const produced = req.body.produced;
                const nameOfAlcohol = req.body.nameOfAlcohol;

                const users = "INSERT INTO alcohols SET userName = '" + userName + "', produced = '" + produced + "', nameOfAlcohol = '" +
                    nameOfAlcohol + "', userId = '" + userId + "'";

                db.query(users, (error, result) => {
                    if (error) {
                        return { message: error };
                    } else {
                        const users = "SELECT id, nameOfAlcohol FROM alcohols";

                        db.query(users, (error, resultOfAlcohols) => {
                            if (error) {
                                return { message: error }
                            } else {
                                const typeOfAlcohol = req.body.type;
                                const category = req.body.category;
                                const results = resultOfAlcohols.find(el => el.nameOfAlcohol === nameOfAlcohol && el.id === result.insertId)
                                const users = "INSERT INTO typeOfAlcohol SET typeOfAlcohol = '" + typeOfAlcohol + "', nameOfAlcohol = '" +
                                    results.nameOfAlcohol + "', category = '" + category + "', alcoholsId = '" + results.id + "'";

                                db.query(users, (error, result) => {
                                    if (error) {
                                        return { result: error }
                                    } else {
                                        res.status(200).json({ result: result, message: 'Drink successfully created' });
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })

    } catch (error) {
        res.status(400).json({ message: error });
    }

}