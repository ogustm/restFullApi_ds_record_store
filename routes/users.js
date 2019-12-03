var express = require('express');
var router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('../validators/validator');
const auth = require('../middleware/authentication')

const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  authenticateUser
} = require('../controllers/usersControllers');

/* GET users listing. */

router
  .route('/')
  .get(auth, getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router
  .route('/me')
  .get(auth, authenticateUser);

router
  .route('/:id').get(auth, getUser).delete(auth, deleteUser).put(auth, updateUser);


module.exports = router;