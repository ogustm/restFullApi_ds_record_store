var express = require('express');
var router = express.Router();

const {
  getUser
} = require('../controllers/usersControllers');

/* GET users listing. */
router.get('/', getUser); // The controller function

module.exports = router;