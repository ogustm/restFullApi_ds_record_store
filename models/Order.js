const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

//Schema

const OrderSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        default: new Date()
    },
    records: [{
        quantity: {
            type: Number,
            required: true,

        },
        record: {
            type: Schema.Types.ObjectId,
            ref: 'Record'
        }
    }]
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

OrderSchema.virtual('totalPrice').get(function () {
    let records = this.records;
    console.log(this);

    totalPriceReducer = (acc, curr) => {
        return acc + curr.quantity * curr.record.price;
    }
    return totalPrice = records.reduce(totalPriceReducer, 0);
});

module.exports = mongoose.model('Order', OrderSchema); //MODEL