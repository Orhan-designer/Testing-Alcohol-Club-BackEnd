const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);
const mysqlDb = require('./../settings/mysqlDb');

exports.createNewDrink = (req, res) => {
    try {
        mongoClient.connect((error, client) => {
            const db = client.db('tastingclub');

            const name = req.body.name;
            const region = req.body.region;
            const manufacturer = req.body.manufacturer;
            const strength = req.body.strength;
            const volume = req.body.volume;
            const grape = req.body.grape;
            const category = req.body.category;
            const typeOfDrink = req.body.typeOfDrink;

            const collection = db.collection('drinks').insertOne({
                name: name,
                region: region,
                manufacturer: manufacturer,
                strength: strength,
                volume: volume,
                grape: grape,
                category: category,
                typeOfDrink: typeOfDrink

            }, (err, result) => {
                if (err) {
                    return console.log(error)
                } else {
                    const selectFromUsers = "SELECT firstName FROM users";

                    mysqlDb.query(selectFromUsers, (error, userResult) => {
                        if (error) {
                            return console.log('User not found')
                        } else {
                            const rating = req.body.rating;
                            const feedBack = req.body.feedBack;
                            const dateOfDegustation = req.body.dateOfDegustation;

                            const insertToDrinks = "INSERT INTO drinksRating SET mongoId = '" +
                                result.insertedId + "', userName = '" +
                                userResult[0].firstName + "', rating = '" +
                                rating + "', feedBack = '" +
                                feedBack + "', dateOfDegustation = '" +
                                dateOfDegustation + "'";

                            mysqlDb.query(insertToDrinks, (error, insertResult) => {
                                if (error) {
                                    return console.log('Error');
                                } else {
                                    res.status(200).json({ message: 'Drink created', result: result });
                                }
                            })

                        }
                    })
                }
            });
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}