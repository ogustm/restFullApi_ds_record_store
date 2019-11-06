const express = require('express');
const router = express.Router();
const {
    getRecords,
    addRecord,
    getRecord,
    deleteRecord
} = require('../controllers/recordsControllers');

router
    .route('/')
    .get(getRecords)
    .post(addRecord);

router
    .route('/:id').get(getRecord).delete(deleteRecord);

// /* GET all the records */
// router.get('/', getRecords); // The controller function

// /* POST a new record */
// router.post('/', addRecord); // The controller function

module.exports = router;