'use strict'

const { User } = require('../models');
const { JWT_SECRET } = require('../config/settings');
const jwt = require('jsonwebtoken');

class UsersController {

    save(user) {
        return new User(user).save();
    }

    get() {
        return User.find({}, null, { sort: { createdAt: -1 } });
    }

    getOne(data) {
        return User.findOne(data);
    }

    getById(id) {
        return User.findById(id);
    }

    getByEmail(email) {
        return User.findOne({ email }).select('+password');
    }

    update(id, user) {
        return User.findByIdAndUpdate(id, { $set: user }, { new: true });
    }

    delete(id) {
        return User.findByIdAndDelete(id);
    }

    async getToken(id) {
        try {
            const user = (await this.getById(id)).toJSON();
            return jwt.sign(user, JWT_SECRET);
        } catch (error) {
            throw error;
        }
    }

}


module.exports = new UsersController();