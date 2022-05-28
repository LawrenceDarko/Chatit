const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const handleAsync = require("express-async-handler");

const protectRoute = handleAsync(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const secret = "this is the secret";
            const decoded = jwt.verify(token, secret);
            req.user = await User.findById(decoded.user_id).select('-password');
            next();
        } catch (err) {
            res.status(401).send('Unauthorized Access');
        }
    }
    if(!token){
        res.status(401).send('Unauthorized Access');
    }
});

module.exports = {protectRoute};