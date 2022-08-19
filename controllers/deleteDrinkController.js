const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);
const ObjectId = require('mongodb').ObjectId;
const mysqlDb = require('./../settings/mysqlDb');

exports.deleteDrink = (req, res) => {
    try {
        const mongoId = req.body.id;

        mongoClient.connect((error, client) => {
            const db = client.db('tastingclub');

            db.collection('drinks').deleteOne({ '_id': ObjectId(mongoId) }, (err, result) => {
                if (err) {
                    return res.status(400).json({ error: 'An error occurred while deleting the drink' });
                } else {
                    const userId = req.params.id;
                    const deleteFromTable = "DELETE FROM drinksRating WHERE userId = '" + userId + "' AND mongoId = '" + mongoId + "'";

                    mysqlDb.query(deleteFromTable, (error, deleteTableResult) => {
                        if (error) {
                            return res.status(400).json({ error: "This drink not exist" });
                        } else {
                            return res.status(200).json({ message: 'Drink deleted', result: result });
                        }
                    });
                }
            });
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}