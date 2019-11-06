const express = require('express');
const router = express.Router();
const {
    getOrders,
    addOrder
} = require('../controllers/ordersControllers');

/* GET all the records */
router.get('/', getOrders); // The controller function

/* POST a new record */
router.post('/', addOrder); // The controller function

module.exports = router;