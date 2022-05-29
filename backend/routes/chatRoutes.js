const express = require('express');
const { protectRoute } = require('../middleware/auth');
const { accessChat } = require('../controllers/chatControllers');

const router = express.Router();

router.route('/').post(protectRoute, accessChat);

module.exports = router;