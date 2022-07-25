const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const mysqlConnection = require('./settings/mysqlDb');
const mongoose = require('mongoose');
const db = mongoose.connection;
// const createUser = require('./models/user');

app.use(cors());

mysqlConnection.connect((error) => {
    if (error) {
        return console.log('Ошибка подключения к БД');
    } else {
        return console.log('Подключение к БД успешно...')
    }
});

mongoose.connect('mongodb+srv://Orhan:Mamedov03Danskih09@cluster0.md34d.mongodb.net/?retryWrites=true&w=majority');

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected to MongoDB successfully");
});

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://qaq-app-dev.asist-lab.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require('./settings/routes');
route(app);

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`)
})
