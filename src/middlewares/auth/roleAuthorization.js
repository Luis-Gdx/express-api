'use strict'

const roleAuthorization = (roles) => {

    return (req, res, next) => {
        const user = req.user;
        if (user.roles.some(role => roles.includes(role))) {
            next();
        } else {
            res.status(403).send({ message: 'forbiden', error: true });
        }

    }
}

module.exports = roleAuthorization;
