var express = require('express');
var router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('../validators/validator');

const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser
} = require('../controllers/usersControllers');

/* GET users listing. */

router
  .route('/')
  .get(getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router
  .route('/:id').get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;