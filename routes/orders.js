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
    .get(getOrders)
    .post(addOrder);

router
    .route('/:id').get(getOneOrder).delete(deleteOrder).put(updateOrder);

module.exports = router;