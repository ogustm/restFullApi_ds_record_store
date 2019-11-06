var express = require('express');
var router = express.Router();

const {
  getUser,
  addUser
} = require('../controllers/usersControllers');

/* GET users listing. */
router.get('/', getUser); // The controller function

router.post('/', addUser);

module.exports = router;