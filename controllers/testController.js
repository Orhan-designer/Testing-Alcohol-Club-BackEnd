const db = require('./../settings/mysqlDb');
const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority'
const mongoClient = new MongoClient(mongoUrl);

exports.test = (req, res) => {
    try {
        const selectFromMysql = "SELECT mongoId FROM drinksRating";

        db.query(selectFromMysql, (error, result) => {
            if (error) {
                console.log(error)
            } else {
                mongoClient.connect((error, client) => {
                    const db = client.db('tastingclub');
                    const { name, region, strength, typeOfDrink, category } = req.body;
                    const collection = db.collection('drinks').find({ name: name, region: region, strength: strength, typeOfDrink: typeOfDrink, category: category }).toArray((err, result) => {
                        if (err) return console.log(error);
                        // console.log('1', result);
                        res.status(200).json({ message: 'Success', result: result });

                    });
                })

            }
        })

    } catch (error) {
        return res.status(400).json({ error: error })
    }
}