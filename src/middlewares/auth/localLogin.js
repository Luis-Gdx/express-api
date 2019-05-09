'use strict'
const passport = require('passport');

const localLogin = (req, res, next) => {
    passport.authenticate('local_login', {
        usernameField: 'email',
        passwordField: 'password',
        session: false
    }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(404).json({ error: true, message: 'invalid email or password' });
        }
        req.user = user;
        next();
    })(req, res, next);
};

module.exports = localLogin;