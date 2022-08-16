const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);
const ObjectId = require('mongodb').ObjectId;
const mysql = require('../settings/mysqlDb');

exports.getShortInfoAboutDrink = (req, res) => {
    try {
        const userId = req.query.userId;
        const selectFromDrinks = "SELECT mongoId, userId, rating, feedBack, dateOfDegustation FROM drinksRating WHERE userId = '" + userId + "'";

        mysql.query(selectFromDrinks, (error, tableResult) => {
            if (error) {
                res.status(400).json({ error: error });
            } else {
                const mongoId = tableResult.map(el => ObjectId(el.mongoId));
                mongoClient.connect((error, client) => {
                    const db = client.db('tastingclub');
                    const collection = db.collection('drinks').find({ '_id': { $in: mongoId } }).toArray((err, result) => {
                        let resultFromMongo = result;

                        let findElement = tableResult.map(el => {
                            let res = resultFromMongo.find(el2 => el2._id?.toString() === el.mongoId);

                            // delete el.rating
                            // delete el.feedBack
                            delete el.dateOfDegustation
                            delete el.userId

                            delete res.grape
                            delete res.manufacturer
                            delete res.mongoId
                            delete res.volume

                            return { ...el, ...res };
                        })

                        if (err) {
                            res.status(400).json({ error: error });
                        }
                        res.status(200).json({ message: 'You found it', result: findElement });
                    });
                });
            }
        });
    } catch (error) {
        res.status(400).json({ error: error });
    }
}
