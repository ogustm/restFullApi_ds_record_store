//EXTERNAL DEPENDENCIES
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
var mongoose = require('mongoose');



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

// CONNECT TO MONGOOSE
mongoose.connect('mongodb://localhost:27017/record_store', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

mongoose.connection.on(
    'error',
    console.error.bind(console, 'connection error:')
);

mongoose.connection.on('open', () => {
    console.log('Connecting to the database...');
});

// All .use are middleware functions
//REQUEST PARSERS
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(setCors);

//STATIC FILES 
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
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