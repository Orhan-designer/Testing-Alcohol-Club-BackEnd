const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 3000;
const mysqlConnection = require('./settings/mysqlDb');
const db = require('./settings/mongodb');
// const createUser = require('./models/user');
// const myDrinks = require('./models/myDrinks');
// const groups = require('./models/groups');
// const usersGroups = require('./models/usersGroups');
app.use(cors());

mysqlConnection.connect((error) => {
    if (error) {
        return console.log('Error connect to Mysql...');
    } else {
        return console.log('Successful connected to Mysql...')
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const route = require('./settings/routes');
route(app);

app.listen(port, '0.0.0.0', () => {
    console.log(`App listening on port ${port}`);
})
