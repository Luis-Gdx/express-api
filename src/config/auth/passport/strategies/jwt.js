'use-strict'

const { JWT_SECRET } = require('./../../../settings');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { usersService } = require('./../../../../services');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = JWT_SECRET;
passport.use(new JwtStrategy(opts,
    async (jwt_payload, done) => {
        const id = jwt_payload._id;
        try {
            const user = await usersService.getById(id);
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (error) {
            return done(error, false);
        }
    }));

passport.use('admin', new JwtStrategy(opts,
    async (jwt_payload, done) => {
        const id = jwt_payload._id;
        try {
            const user = await usersService.getById(id);
            if (user) {
                if (!user.roles.includes('admin')) {
                    return done(null, user, { message: 'forbiden', status: 403 });
                }
                return done(null, user);
            } else {
                return done(null, false);
                // or you could create a new account
            }
        } catch (error) {
            return done(error, false);
        }
    }));