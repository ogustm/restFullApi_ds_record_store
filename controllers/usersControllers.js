const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
////////////////////////////////////
const User = require('../models/User');
const createError = require('http-errors');
const {
    validationResult
} = require('express-validator');

exports.getUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (e) {
        next(e);
    }
};


exports.addUser = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(200).send(user);
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