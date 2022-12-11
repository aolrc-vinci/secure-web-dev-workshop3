const router = require('express').Router()
const usersService = require('./users.service')
const passport = require('passport');
require('../auth/local-strategy');
require('../auth/jwt-strategy');

router.post('/users/register', async (req, resp) => {
    const user = await usersService.register(req.body);
    if (user == null)
        return resp.status(404).send({err: "User already exists"});
    else
        return resp.status(200).send({user: user.username});
})
router.use('/users/login', passport.authenticate('local', {session: false}));
router.post( '/users/login',async (req, resp) => {
    if (req.user) {
        return resp.status(200).send({mess: "Connected", username: req.body.username, jwt: await usersService.generateJwt(req.user)});
    }
    else
        return resp.status(403).send({err: "Incorrect username or password."});
})

router.use('/users/me', (passport.authenticate('jwt', {session: false})));
router.route('/users/me')
    .get(async (req, resp) => {
        if (req.user) {
            return resp.status(200).send({mess: "You are registered as", user: req.user});
        }
        else
            return resp.status(403).send({err: "Unauthorized"});
    })
    .delete(async (req, resp) => {
        const user = await usersService.deleteUserMe(req.user._id);
        console.log(user);
        if (user) {
            return resp.status(200).send({mess: "User deleted", user: user});
        }
        else
            return resp.status(403).send({err: "Unauthorized"});
    })
    .put(async (req, resp) => {
        const user = await usersService.updateUserMe(req.user._id, req.body);
        if (user) {
            return resp.status(200).send({mess: "User updated", user: user});
        }
        else
            return resp.status(403).send({err: "Unauthorized"});
    })
router.get('/users', async (req, resp) => {
    return resp.status(200).send({users: (await usersService.findAll())})
})


module.exports = router