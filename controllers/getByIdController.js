const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);
const ObjectId = require('mongodb').ObjectId;
const db = require('../settings/mysqlDb');

exports.getById = (req, res) => {
    try {
        const id = req.params.id;
        const selectFromTable = "SELECT mongoId, rating, feedBack, dateOfDegustation FROM drinksRating WHERE mongoId = '" + id + "'";

        db.query(selectFromTable, (error, tableResult) => {
            if (error) {
                return res.status(400).json({ error: error })
            } else {
                mongoClient.connect((error, client) => {
                    const db = client.db('tastingclub');
                    const collection = db.collection('drinks').findOne({ '_id': ObjectId(id) }, (err, result) => {
                        if (err) {
                            return console.log(error);
                        };
                        res.status(200).json({ message: 'Drink find', result: result, tableResult: tableResult });
                    });
                });
            }
        })
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}