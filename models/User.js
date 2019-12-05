const mongoose = require('mongoose');
const {
    Schema
} = mongoose;
const Address = require('./Address');
const jwt = require('jsonwebtoken');
const encryption = require("../lib/encryption");

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
        _id: user._id.toHexString(),
        access
    }, 'babylonia').toString();
    console.log(token);

    user.token.push({
        access,
        token
    });
    return token;
};

UserSchema.methods.checkPassword = async function(password){
    const user = this;
    return await encryption.compare(password, user.password)
};

UserSchema.methods.getPublicFields = function () {
    return {
        _id: this._id,
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        birthday: new Date(this.birthday),
        address: this.address
    }
};

UserSchema.statics.findByToken = function (token) {
    const User = this;
    let decoded;
    try {
        decoded = jwt.verify(token, 'babylonia');

    } catch (error) {
        return;
    }


    console.log(decoded);

    return User.findOne({
        _id: decoded._id        
    });

};

UserSchema.pre('save'), async function (next) {
    //only hash the password is it has been modified
    if (!this.isModified('password')) return next();

    this.password = await encryption.encrypt(this.password);
    next();
};

module.exports = mongoose.model('User', UserSchema); //MODEL