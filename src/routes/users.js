'use strict'

const express = require('express');
const router = express.Router();
const { usersController } = require('./../controllers');
const { localLogin, roleAuthorization } = require('./../middlewares').auth;
const passport = require('passport');

router.post('/', usersController.save);
router.post('/login', localLogin, usersController.login);
router.get('/', passport.authenticate('jwt', { session: false }), usersController.get);
router.get('/get-token', passport.authenticate('jwt', { session: false }), usersController.getToken);
router.get('/:id', [passport.authenticate('jwt', { session: false }), roleAuthorization(['admin'])], usersController.getById);
router.put('/:id', usersController.update);
router.delete('/:id', usersController.delete);

module.exports = router;