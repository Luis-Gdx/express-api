'use strict'

const mongoose = require('mongoose');
const enviroments = require('./../config/enviroments');
const { ENV, MONGODB } = require('./../config/settings').DATABASES;
const host = MONGODB.HOST;
const database = MONGODB.DATABASE;
const user = MONGODB.USER;
const password = MONGODB.PASSWORD;
const dbport = MONGODB.PORT;


mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

class Connection {
    env_prod() {
        return mongoose.connect(`mongodb://${user}:${password}@${host}:${dbport}/${database}`, { useNewUrlParser: true });
    }

    env_dev() {
        return mongoose.connect(`mongodb://${host}:${dbport}/${database}`, { useNewUrlParser: true });
    }

    connect() {
        if (ENV === enviroments.PROD) {
            return this.env_prod();
        } else {
            return this.env_dev();
        }
    }
}

module.exports = new Connection();