//EXTERNAL DEPENDENCIES

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var mongoose = require('mongoose');
const {
    body,
    sanitizeBody
} = require('express-validator');


//ROUTERS
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const recordsRouter = require('./routes/records');
const ordersRouter = require('./routes/orders');

//OUR MIDDLEWARE
const {
    setCors
} = require('./middleware/security');

// INIT THE SERVER
const app = express();

//LOGS
app.use(logger('dev'));

//REQUEST PARSERS
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(setCors);

// CONNECT TO MONGOOSE
mongoose.connect('mongodb://localhost:27017/record_store', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

mongoose.connection.on.bind('error', console.error);
mongoose.connection.on('open', () => {
    console.log('Connecting to the database...');;
    console.log(mongoose);

});

// All .use are middleware functions


//STATIC FILES 
app.use(express.static(path.join(__dirname, 'public')));

const validationRules = () => {
    return [
        body('email')
        .isEmail()
        .normalizeEmail()
        .exists()
        .withMessage('Do you call this an email?'),
        body('password')
        .isLength({
            min: 10
        }).withMessage('Your password should be 10characters long.'),
        body('firstName').trim(),
        body('lastName').trim()
    ];
};
// ROUTES
app.use('/', indexRouter);
app.use('/users', validationRules(), usersRouter);
app.use('/records', recordsRouter);
app.use('/orders', ordersRouter);

// ERROR HANDLING

app.use(function (req, res, next) {
    const err = new Error('Something went wrong');
    next(err) // This means I'm calling the next function
});

app.use(function (err, req, res, next) {
    res.status(400).send({
        error: {
            message: err.message
        }
    })
});

module.exports = app;