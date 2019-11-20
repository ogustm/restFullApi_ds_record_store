const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);
////////////////////////////////////
const Record = require('../models/Record');
const createError = require('http-errors');

exports.getRecords = (req, res, next) => {
    const records = db.get('records').value();
    res.status(200).send(records);
};

exports.addRecord = (req, res, next) => {
    const record = req.body;
    console.log(record);

    db.get('records')
        .push(record)
        .last()
        .assign({
            id: Date.now().toString()
        }).write();

    res.status(200).send(record);
};

//records/:id
exports.getRecord = async (req, res, next) => {

    try {
        const {
            id
        } = req.params;
        const record = await Record.findById(id);
        if (!record) throw new createError.NotFound();
        res.status(200).send(record);
    } catch (e) {
        next();
    }



};

exports.deleteRecord = (req, res, next) => {
    const {
        id
    } = req.params;

    const record = db.get('records')
        .remove({
            id: id
        }).write();

    res.status(200).send(record);
};


exports.updateRecord = (req, res, next) => {
    const {
        id
    } = req.params;
    const data = req.body;

    const record = db
        .get('records')
        .find({
            id
        })
        .assign(data)
        .write();

    res.status(200).send(record);
};