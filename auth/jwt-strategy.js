const jwt = require('jsonwebtoken');
const passport = require("passport");
const stream = require("stream");
const usersService = require("../users/users.service");
const ExtractJWT = require('passport-jwt').ExtractJwt;
const {Strategy} = require("passport-jwt");
const JWTstrategy = require('passport-jwt').Strategy;

passport.use( new Strategy({
        secretOrKey: process.env.JWTSECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    async function (payload, done) {
        try {
            console.log(payload);
            const user = await usersService.userMe(payload.sub);
            if (!user) {
                return done(null,false);
            }
            return done(null,user);
        } catch (err){
            console.log(err);
            return done(err,false)
        }
    }
) );
module.exports = passport;