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
        type: Schema.Types.ObjectId,
        ref: 'Record'
    }]
});

module.exports = mongoose.model('Order', OrderSchema); //MODEL