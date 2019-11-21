var express = require('express');
var router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('..validators/validator');

const {
  getUser,
  addUser,
  deleteUser,
  updateUser
} = require('../controllers/usersControllers');

/* GET users listing. */

router
  .route('/')
  .get(getUser)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router
  .route('/:id').delete(deleteUser).put(updateUser);

module.exports = router;