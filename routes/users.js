var express = require('express');
var router = express.Router();
const {
  userValidationRules,
  userValidationErrorHandling,
} = require('../validators/validator');
const auth = require('../middleware/authentication')
const isAdmin = require('../middleware/rolesAuthenticator.js');

const {
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  authenticateUser,
  loginUser
} = require('../controllers/usersControllers');

/* GET users listing. */

router
  .route('/')
  .get(auth, isAdmin, getUsers)
  .post(userValidationRules(), userValidationErrorHandling, addUser);

router.route('/me').get(auth, authenticateUser);
router.route('/login').post(loginUser);

router
  .route('/:id')
  .get(auth, getUser)
  .delete(auth, deleteUser)
  .put(auth, updateUser);


module.exports = router;