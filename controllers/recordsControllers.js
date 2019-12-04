const Record = require('../models/Record');
const createError = require('http-errors');

exports.getRecords = async (req, res, next) => {
    try {
        const record = await Record.find().select('__v');
        res.status(200).send(record);
    } catch (e) {
        next(e)
    }
};

exports.addRecord = async (req, res, next) => {
    try {
        const record = new Record(req.body);
        await record.save();
        res.status(200).send(record);
    } catch (e) {
        next(e)
    }
};

//records/:id
exports.getRecord = async (req, res, next) => {

    try {

        const record = await Record.findById(id).select('- __v');
        if (!record) throw new createError.NotFound();
        res.status(200).send(record);
    } catch (e) {
        next();
    }
};

exports.deleteRecord = async (req, res, next) => {
    try {
        const record = await Record.findByIdAndDelete(req.params.id).select('- __v');
        if (!record) throw new createError.NotFound();
        res.status(200).send(record);
    } catch (e) {
        next(e)
    }
};


exports.updateRecord = async (req, res, next) => {
    try {
        const record = await Record.findByIdAndUpdate(req.params.id, req.body, {
            new: true // the boolean returns the modified item
        }).select('__v');
        if (!record) throw new createError.NotFound();
        res.status(200).send(record);
    } catch (e) {
        next(e)
    }

};