const User = require('../models/User');
const createError = require('http-errors');
const {
    validationResult
} = require('express-validator');



exports.getUsers = async (req, res, next) => {
    try {
        const users = await User.find()
            .select('-password -_v')
            .sort('-lastname')
            .limit(5)
        res.status(200).send(users);
    } catch (e) {
        next(e);
    }
};

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password -_v');
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (e) {
        next(e);
    }
};

exports.addUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        const token = user.generateAuthToken();
        await user.save();
        const data = user.getPublicFields();
        res.status(200).header('x-auth', token).send(data);
    } catch (e) {
        next(e);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const user = await new User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (error) {
        next(e);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) throw new createError.NotFound();
        res.status(200).send(user);
    } catch (e) {
        next(e);
    }
};

exports.authenticateUser = async (req, res, next) => {
    res.status(200).send(req.user);

};