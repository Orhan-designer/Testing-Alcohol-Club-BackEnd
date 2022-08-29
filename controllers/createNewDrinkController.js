const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);
const mysqlDb = require('./../settings/mysqlDb');

exports.createNewDrink = (req, res) => {
    try {
        mongoClient.connect((error, client) => {
            const db = client.db('tastingclub');
            const userId = req.body.userId;
            const name = req.body.name;
            const region = req.body.region;
            const manufacturer = req.body.manufacturer;
            const strength = req.body.strength;
            const volume = req.body.volume;
            const grape = req.body.grape;
            const category = req.body.category;
            const typeOfDrink = req.body.typeOfDrink;

            db.collection('drinks').insertOne({
                name: name,
                region: region,
                manufacturer: manufacturer,
                strength: strength,
                volume: volume,
                grape: grape,
                category: category,
                typeOfDrink: typeOfDrink,
            }, (err, result) => {
                if (err) {
                    return console.log(error);
                } else {
                    /* подставить в select запрос id и firstName пользователя. Досать их можно с localStorage */
                    const selectFromUsers = "SELECT firstName FROM users";

                    mysqlDb.query(selectFromUsers, (error, userResult) => {
                        if (error) {
                            return console.log('User not found');
                        } else {
                            const rating = req.body.rating;
                            const feedBack = req.body.feedBack;
                            const dateOfDegustation = req.body.dateOfDegustation;
                            /* нужно отфильтровать пользователей в массиве, которые будут добавлять новый напиток */
                            const insertToDrinks = "INSERT INTO drinksRating SET mongoId = '" +
                                result.insertedId + "', userName = '" +
                                userResult[0].firstName + "', userId = '" +
                                userId + "', rating = '" +
                                rating + "', feedBack = '" +
                                feedBack + "', dateOfDegustation = '" +
                                dateOfDegustation + "'";

                            mysqlDb.query(insertToDrinks, (error, insertResult) => {
                                if (error) {
                                    res.status(400).json({ message: 'Error' });
                                } else {
                                    const insertAllReviews = "INSERT INTO allReviews SET mongoId = '" +
                                        result.insertedId + "', userId = '" +
                                        userId + "', rating = '" +
                                        rating + "', feedBack = '" +
                                        feedBack + "', dateOfDegustation = '" +
                                        dateOfDegustation + "'";

                                    mysqlDb.query(insertAllReviews, (error, allReviewsResults) => {
                                        if (error) {
                                            return res.status(400).json({ error: 'Cannot insert into table' })
                                        } else {
                                            res.status(200).json({ message: 'Drink created', result: result });
                                        }
                                    })
                                }
                            });
                        }
                    });
                }
            });
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}