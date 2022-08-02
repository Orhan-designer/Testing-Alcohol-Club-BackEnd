const db = require('../settings/mysqlDb');

exports.newDrink = (req, res) => {
    try {
        const typeId = req.body.typeId;
        const typeName = req.body.typeName.typeName;
        const categoryId = req.body.categoryId;
        const categoryName = req.body.categoryName.categoryName;
        const produced = req.body.produced;
        const drinkName = req.body.drinkName;
        const userName = req.body.userName;
        const userId = req.body.userId;

        const users = "INSERT INTO drinks SET userName = '" + userName + "', userId = '" +
            userId + "', typeName = '" +
            typeName + "', typeId = '" +
            typeId + "', categoryName = '" +
            categoryName + "', categoryId = '" +
            categoryId + "', drinkName = '" +
            drinkName + "', produced = '" +
            produced + "'";

        db.query(users, (error, result) => {
            if (error) {
                return { message: error };
            } else {
                const selectFromDrinks = "SELECT typeName FROM drinks WHERE typeName = '" + typeName + "'";

                db.query(selectFromDrinks, (error, drinksResult) => {
                    if (error) {
                        res.status(400).json({ result: error })
                    } else {
                        const insertTypesOfAlcohol = "INSERT INTO typesOfAlcohol SET typeName = '" + typeName + "'";

                        db.query(insertTypesOfAlcohol, (error, typesOfAlcoholResult) => {
                            if (error) {
                                console.log(error);
                            } else {
                                const selectFromDrinksAndTypes = "SELECT categoryName, typeId FROM drinks WHERE categoryName = '" + categoryName + "' AND typeId = '" + typeId + "'";

                                db.query(selectFromDrinksAndTypes, (error, drinksAndTypesResult) => {
                                    if (error) {
                                        res.status(400).json({ result: error })
                                    } else {
                                        const insertCategoryOfType = "INSERT INTO categoryOfType SET categoryName = '" + categoryName + "', typeId = '" + typeId + "'";

                                        db.query(insertCategoryOfType, (error, categoryResult) => {
                                            if (error) {
                                                res.status(400).json({ result: error })
                                            } else {
                                                res.status(200).json({ result: categoryResult, message: 'Drink successfully created' });
                                            }
                                        })
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