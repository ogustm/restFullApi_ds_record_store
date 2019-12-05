const express = require('express');
const router = express.Router();
const {
    getOrders,
    addOrder,
    getOneOrder,
    deleteOrder,
    updateOrder
} = require('../controllers/ordersControllers');


router
    .route('/')
    .get(auth, getOrders)
    .post(auth, addOrder);

router
    .route('/:id')
    .get(auth, getOneOrder)
    .delete(auth, deleteOrder)
    .put(auth, updateOrder);

module.exports = router;