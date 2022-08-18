const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);
const ObjectId = require('mongodb').ObjectId;
const mysqlDb = require('./../settings/mysqlDb');

exports.deleteDrink = (req, res) => {
    try {
        const mongoId = req.params.id;

        mongoClient.connect((error, client) => {
            const db = client.db('tastingclub');

            db.collection('drinks').deleteOne({ '_id': ObjectId(mongoId) }, (err, result) => {
                if (err) {
                    return res.status(400).json({ error: 'An error occurred while deleting the drink' });
                } else {
                    res.status(200).json({ message: 'Drink deleted', result: result })
                }
            })
        })
    } catch (error) {
        res.status(400).json({ error: error })
    }
}