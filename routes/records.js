const express = require('express');
const router = express.Router();
const {
    getRecords,
    addRecord
} = require('../controllers/recordsControllers');

/* GET all the records */
router.get('/', getRecords); // The controller function

/* POST a new record */
router.post('/', addRecord); // The controller function

module.exports = router;