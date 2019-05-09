'use strict'

const { usersService } = require('./../services');
const { JWT_SECRET } = require('../config/settings');
const jwt = require('jsonwebtoken');


class usersController {

    async save(req, res) {
        try {
            const user = (await usersService.save(req.body)).toJSON();
            const token = jwt.sign(user, JWT_SECRET);
            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async login(req, res) {
        try {
            const { user } = req;
            const token = jwt.sign(user, JWT_SECRET);
            return res.status(200).json({ user, token });
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async get(req, res) {
        try {
            const users = await usersService.get();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getById(req, res) {
        const { id } = req.params;
        try {
            const user = await usersService.getById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async update(req, res) {
        const { id } = req.params;
        try {
            const user = await usersService.update(id, req.body);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        try {
            const user = await usersService.delete(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getToken(req, res) {
        const { id } = req.user;
        try {
            const token = await usersService.getToken(id);
            return res.status(200).json({ token });
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}





module.exports = new usersController();