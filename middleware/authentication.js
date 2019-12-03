const User = require('../models/User');
const createError = require('http-errors');

const auth = (req, res, next) => {
    try {
        const token = req.header('x-auth');
        const user = await user.findByToken(token);
        if (!user) throw new createError.NotFound();
        req.user = user;
        next()
    } catch (e) {
        next(e);
    }
};

module.exports = auth;