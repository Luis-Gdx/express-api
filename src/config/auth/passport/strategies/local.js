'use strict'

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { usersService } = require('./../../../../services');

passport.use('local_login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: false
},
    (email, password, done) => {
        usersService.getByEmail(email).then(
            async user => {
                if (!user) {
                    return done(null, false);
                }
                if (!(await user.verifyPassword(password))) {
                    return done(null, false);
                }
                user = user.toJSON();
                delete user.password;
                return done(null, user);
            },
            err => {
                return done(err);
            }
        );
    }
));
