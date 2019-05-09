'use strict'

const { usersRoutes } = require('./');

class Router {

    set(app) {
        app.use('/users', usersRoutes);
    }

}

module.exports = new Router();