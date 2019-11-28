const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

//Schema

const RecordSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true

    },
    year: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Record', RecordSchema); //MODEL