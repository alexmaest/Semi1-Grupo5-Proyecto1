const express = require('express');
const router = express.Router();
const authenticateToken = require('../controllers/extServices/authMiddleware');

const loginController = require('../controllers/loginController');

router.get('/:email/:password', loginController.usersLogin);
router.post('/passwordChange', loginController.passwordSend);
router.post('/passwordChange/update', authenticateToken, loginController.passwordUpdate);

module.exports = router;