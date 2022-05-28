const express = require('express');
const { registerUser, authenticateUser, getUser } = require('../controllers/userControllers');
// const {protectRoute} = require('../middleware/auth');


const router = express.Router();

router.route("/").get(getUser);
router.route('/register').post(registerUser);
router.post('/login', authenticateUser);
 
 
module.exports = router; 