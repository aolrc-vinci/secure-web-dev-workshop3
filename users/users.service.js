const User = require('./users.model');
const usersLocal = require('../auth/local-strategy');
const Location = require("../locations/locations.model");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

async function findAll () {
    try {
        const resp = await User.find().select('-password');
        return resp;
    } catch (err) {
        console.log("User not found");
        console.log(err);
    }
}
async function userMe(id) {
    try {
        const resp = await User.findOne({_id:id}).select('-password');
        return resp;
    } catch (err) {
        console.log(err);
        return "User doesn't exist";
    }
}

async function register(user) {
    try {
        const hashedPass = await bcrypt.hash(user.password, saltRounds)
        console.log(hashedPass);
        return await User.create({username:user.username, password:hashedPass});
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function deleteUserMe(id) {
    try {
        const resp = await User.findOneAndDelete({_id: id}).select('-password');
        return resp;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function generateJwt(user){
    try {
        return jwt.sign({sub:user._id.toString()}, process.env.JWTSECRET)
    } catch (err) {
        return "Error jwt generation"
    }
}

async function updateUserMe(id, newProperty){
    try {
        const resp = await User.findOneAndUpdate({_id: id}, newProperty).select('-password');
        return resp;

    } catch (err) {
        console.log(err);
        return null
    }
}



module.exports = {
    findAll,
    userMe,
    register,
    deleteUserMe,
    generateJwt,
    updateUserMe
}