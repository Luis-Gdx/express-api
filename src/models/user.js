'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    },
    roles: {
        type: [String],
        required: true,
        default: 'user'
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

UserSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, saltRounds);
    this.password = hash;
    next();
});

UserSchema.methods.verifyPassword = async function (password) {
    const hash = this.password;
    return await bcrypt.compare(password, hash);
}

module.exports = mongoose.model('User', UserSchema);