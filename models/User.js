const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const Address = require('./Address');
const jwt = require('jsonwebtoken');

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
    birthday: {
        type: Date,
        required: [true, "Don't forget your birthday!"]
    },
    userName: {
        type: String,
        required: [true, "Add an User Name"],
        unique: true
    },
    address: {
        type: Address,
        required: true
    },
    tokens: [{
        access: {
            type: String,
            required: true

        },
        token: {
            type: String,
            required: true
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

UserSchema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'x-auth';
    const token = jwt.sign({
        id: user._id.toHexString(),
        access
    }, 'babylonia').toString();
    console.log(token);

    user.token.push({
        access,
        token
    });
    return token;
};
module.exports = mongoose.model('User', UserSchema); //MODEL