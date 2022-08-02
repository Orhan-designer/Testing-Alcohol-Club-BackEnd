const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority'
const mongoClient = new MongoClient(mongoUrl);


mongoClient.connect((error, client) => {
    const db = client.db('tastingclub');
    const collection = db.collection('drinks');
    if (error) {
        return console.log(error);
    }
    console.log('Connect to Mongodb is successful');
})

module.exports = mongoClient;