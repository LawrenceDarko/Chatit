const handleAsync = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// FOR REGISTERING USER
const registerUser = handleAsync (async (req, res) => { 
    const {name, email, password} = req.body;

    if (!(name && email && password)) {
        return res.status(400).send("Please enter all fields");
    }

    const user = await User.findOne({email}); 
    if (user) {
        return res.status(400).send("User already exists");
     }

    encryptedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({name, email, password: encryptedPassword});

    const secret = "this is the secret";
    const token = jwt.sign({user_id: newUser._id}, secret, {expiresIn: '100d'});
    
    newUser.token = token;

    if(newUser) {
        res.status(201).send(newUser);
    }
    else{
        res.status(400).send("Error creating user");
    }

 });


// FOR LOGIN
 const authenticateUser = handleAsync(async (req, res) => {
    const {email, password} = req.body;

    if(!(email && password)) {
        return res.status(400).send("Please enter all fields");
    }

    const user = await User.findOne({email});

    if(user && (await bcrypt.compare(password, user.password))) {
        const secret = "this is the secret";
        const token = jwt.sign({user_id: user._id}, secret, {expiresIn: '100d'});
        user.token = token;
        res.status(200).json(user);
    }
    res.status(400).send("Invalid email or password");

});

const getUser = handleAsync(async (req, res) => {
    // const user = await User.findById(req.user._id);
    const user = await User.find({});
    res.status(200).json(user);
})
 
 module.exports = {registerUser, authenticateUser, getUser};
