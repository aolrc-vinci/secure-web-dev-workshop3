const passport = require('passport');
const User = require('../users/users.model');
const { Strategy, ExtractJwt } = require('passport-jwt');
require('dotenv').config();

passport.use(new Strategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET                         
        },
        function(token, done) {
            User.findOne({_id: token.sub}, function(err, user) {
                if (err)    return done(err, false);       
                if (user)   return done(null, {
                    _id:user?._id,
                    role:user?.role
                }); 
                return done(null, false);                   
            });
        }
    )
);
module.exports = passport;