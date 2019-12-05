const mongoose = require('mongoose');
const faker = require('faker');
const User = require('../models/User');
const Record = require('../models/Record');

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

    console.log('Here I am deleting the users');

    //** DELETE ALL USERS */
    try {
        await User.deleteMany({});
        console.log('Old users moved to a better place.');

    } catch (error) {
        console.log(error)
    }

    console.log(`I'm creating 20 fake users`);

    //** CREATE 20 NEW FAKE USERS */
    const userPromises = Array(20)
        .fill(null)
        .map(() => {
            const user = new User({
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password(),
                birthday: faker.date.past(),
                userName: faker.internet.userName(),
                role: faker.random.arrayElement(["admin", "user"]),
                address: {
                    city: faker.address.city(),
                    street: faker.address.streetName()
                }
            });
            const token = user.generateAuthToken();
            return user.save();
        });; //It creates an Array of 20 Stuffs

    // console.log(userPromises);
    try {
        await Promise.all(userPromises);
        console.log('Users stored in the database');
    } catch (e) {
        console.log(e);
    }

    //** DELETE ALL records */

    try {
        await Record.deleteMany({});
        console.log('Old users moved to a better place.');

    } catch (error) {
        console.log(error)
    }
    //** CREATE 20 NEW FAKE RECORDS */
    const recordPromises = Array(20)
        .fill(null)
        .map(() => {
            const record = new Record({
                title: faker.random.words(),
                artist: faker.internet.userName(),
                year: new Date(faker.date.past()).getFullYear(),
                price: faker.commerce.price()
            });
            return record.save();
        });

    try {
        await Promise.all(recordPromises);
        console.log('Records stored in the database');
    } catch (e) {
        console.log(e);
    }

    mongoose.connection.close();

})();