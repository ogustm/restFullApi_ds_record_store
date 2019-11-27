const Order = require('../models/Order');
const createError = require('http-errors');

exports.getOrders = async (req, res, next) => {
    try {
        const orders = await Record.find().populate('records', ' -_v');
        res.status(200).send(orders);
    } catch (e) {
        next(e);
    }
};



exports.addOrder = async (req, res, next) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
};

exports.getOneOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(id);
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
};


exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
};

exports.updateOrder = (req, res, next) => {
    const {
        id
    } = req.params;

    const data = req.body;

    const order = db
        .get('orders')
        .find({
            id
        })
        .assign(data)
        .write();

    res.status(200).send(order);
};