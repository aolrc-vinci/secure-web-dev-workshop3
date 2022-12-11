const { Strategy } = require('passport-local');
const User = require("../users/users.model");
const bcrypt = require("bcrypt");
const passport = require("passport");

passport.use(new Strategy(async function (username, password, done) {
    try {
        const user = await User.findOne({username:username});
        const bool = await bcrypt.compare(password, User.password);
        if (!user) {
            return done(null,false)
        }
        else if (!bool) {
            return done(null,false)
        }
        return done(null,user)
    } catch (err) {
        console.log(err);
        return done(err,false)
    }
}));


module.exports = passport