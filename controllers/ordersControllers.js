const Order = require('../models/Order');
const createError = require('http-errors');

exports.getOrders = async (req, res, next) => {
    // An Admin get all the orders, an user only theirs
    try {
        const orders = await Order.find().populate('records.record', ' -_v');
        res.status(200).send(orders);
    } catch (e) {
        next(e);
    }
};

exports.getOneOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id).populate('records.record', '-v').populate('user', 'userName fullName email');
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
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

exports.deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (e) {
        next(e);
    }
};

exports.updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        if (!order) throw new createError.NotFound();
        res.status(200).send(order);
    } catch (error) {
        next(e);
    }
};