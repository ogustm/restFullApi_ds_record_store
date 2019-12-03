const express = require('express');
const router = express.Router();
const {
    getRecords,
    addRecord,
    getRecord,
    deleteRecord,
    updateRecord
} = require('../controllers/recordsControllers');
const auth = require('../middleware/authentication')


router
    .route('/')
    .get(getRecords)
    .post(addRecord);

router
    .route('/:id').get(auth, getRecord).delete(auth, deleteRecord).put(auth, updateRecord);


module.exports = router;