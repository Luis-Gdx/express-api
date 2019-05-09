'use strict'

const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const router = require('./routes/router');
const passport = require('passport');
const cors = require('cors');

app.use(passport.initialize());

require('./config/auth/passport/strategies');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Headers & cors config
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-type ,authorizationlocal,authorization ,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cors());

router.set(app);

module.exports = http;