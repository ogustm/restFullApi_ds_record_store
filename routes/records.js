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
    .post(auth, addRecord);

router
    .route('/:id')
    .get(auth, getRecord)
    .delete(auth, isAdmin, deleteRecord)
    .put(auth, isAdmin, updateRecord);


module.exports = router;