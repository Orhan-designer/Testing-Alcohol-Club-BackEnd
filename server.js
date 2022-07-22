const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const mysqlConnection = require('./settings/mysqlDb');
// const createUser = require('./models/user');

app.use(cors());

mysqlConnection.connect((error) => {
    if (error) {
        return console.log('Ошибка подключения к БД');
    } else {
        return console.log('Подключение к БД успешно...')
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require('./settings/routes');
route(app);

app.listen(port, '0.0.0.0',() => {
    console.log(`App listening on port ${port}`)
})
