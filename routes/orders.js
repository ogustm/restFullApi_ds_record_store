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

// /* GET all the records */
// router.get('/', getOrders); // The controller function

// /* POST a new record */
// router.post('/', addOrder); // The controller function

// router.delete('/', deleteOrder);

module.exports = router;