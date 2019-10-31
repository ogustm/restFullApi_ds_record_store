const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('data/db.json');
const db = low(adapter);

exports.getUser = (req, res, next) => {
    const users = db.get('users').value();
    res.status(200).send(users);
};