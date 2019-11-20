console.log('I AM A SEED SCRIPT!');

var mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');

// CONNECT TO MONGOOSE / ASYNC FUNCTION

(async function () {

    mongoose.connect('mongodb://localhost:27017/record_store', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    mongoose.connection.on(
        'error',
        console.error.bind(console, 'connection error:')
    );

    mongoose.connection.on('open', () => {
        console.log('Connecting to the database...');
    });

    // console.log(`First)

    //Model.prototype.save() => we save the users we create with faker 

    console.log('I am creating 20 fake users');

    const userPromises = Array(20)
        .fill(null)
        .map(() => {
            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                userName: faker.internet.userName(),
                birthday: faker.date.past(),
                email: faker.internet.email(),
                password: faker.internet.password()
            });
            return user.save();
        });; //It creates an Array of 20 Stuffs

    // console.log(userPromises);
    try {
        await Promise.all(userPromises);
        console.log('Users stored in the database');
    } catch (e) {
        console.log(e);
    }
    mongoose.connection.close();

})();