const User = require('./users.model');
/*const usersLocal = require('../auth/local-strategy');
const Location = require("../locations/locations.model");*/
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
require('dotenv').config();


async function findAll () {
    try {
        const resp = await User.find().select('username');
        return resp;
    } catch (err) {
        console.log("User not found");
        console.error(err);
        return null;
    }
}

async function checkUser(username) {
    try {
        return await User.findOne({'username' : username});
    } catch (err) {
        console.log("User doesn't exist.");
        console.error(err);
        return null;
    }
}

async function getUser(id) {
    try {
        return await User.findOne({'_id':id});
    } catch (err) {
        console.log("User doesn't exist.");
        console.error(err);
        return null;
    }
}

async function register(username, password) {
    try {
        if (username == undefined || password == undefined) throw new Error("undefined username or password");
        const hashedPsw = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            username:username,
            password:hashedPsw,
            role:'user'                   //Default role is user
        });
        console.log(`User successfully added : ${username}:${password}`);
        return user;
    } catch (err) {
        console.log("Error during user creation.");
        console.error(err);
        return null;
    }
}

async function deleteUser(id) {
    try {
        return await User.findOneAndDelete({'_id':id});
    } catch (err) {
        console.log("Error during the suppression of the user.");
        console.error(err);
        return null;
    }
}

async function generateJwt(username){
    try {
        return jwt.sign({sub:username}, process.env.JWTSECRET)
    } catch (err) {
        return "Error jwt generation"
    }
}

async function updateUser(req,res){
    let obj = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.user.role
    }
    console.log(obj)
    console.log(req.user.id)
    console.log(req.user.username)
    const user = await User.findOneAndUpdate(req.user._id, obj, {new:true});
    res.send(user)

}

async function verify(username, password) {
    try {
        const user = await User.findOne({'username' : username});
        const match = await bcrypt.compare(password, user.password);
        return match;
    } catch (err) {
        console.log("Impossible to verify this user.");
        console.error(err);
        return null;
    }
}

async function findOne(value){
    return User.findOne(value);
}

module.exports = {
    findAll,
    checkUser,
    getUser,
    register,
    deleteUser,
    generateJwt,
    updateUser,
    verify,
    findOne
}