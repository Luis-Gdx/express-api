'use strict'

const app = require('./src/app');
const { ENV, PORT } = require('./src/config/settings');
const { mongodb } = require('./src/db');
const chalk = require('chalk');

console.log(chalk.blue('ENV:'), chalk.green(ENV));
mongodb.connect().then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log(`The server is running on port ${PORT}`);
    });
}).catch(err => console.log(err));
