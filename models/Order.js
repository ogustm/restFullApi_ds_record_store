const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

//Schema

const OrderSchema = new Schema({

    quuantity: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    records: [{
        record_id: Number,
        required: true
    }]
});

module.exports = mongoose.model('Order', OrderSchema); //MODEL