const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(mongoUrl);

exports.getByCategory = (req, res) => {
    try {
        mongoClient.connect((error, client) => {
            const db = client.db('tastingclub');
            const searchTerm = req.params.value;
            let regex = { $regex: '^' + searchTerm, $options: 'i' };

            const collection = db.collection('drinks').find(
                { $or: [{ 'name': regex }, { 'region': regex }, { 'strength': regex }, { 'typeOfDrink': regex }] }
            ).toArray((err, result) => {
                if (err) {
                    return console.log(error);
                }
                res.status(200).json({ message: 'Success', result: result });
            });
        })
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}