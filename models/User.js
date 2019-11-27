const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const Address = require('./Address')

//Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: [true, "Add your Last Name"]
    },
    userName: {
        type: String,
        required: [true, "Add an User Name"],
        unique: true
    },
    birthday: {
        type: Date,
        required: [true, "Don't forget your birthday!"]
    },
    email: {
        type: String,
        lowercase: true,
        required: [true, "Add your email to contact you :)"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Don't forget to add a password!"]
    },
    address: {
        type: Address,
        required: true
    }
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('User', UserSchema); //MODEL