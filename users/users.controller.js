const passport = require('passport');
const router = require('express').Router()
const usersService = require('./users.service');
require('../auth/local-strategy');
require('../auth/jwt-strategy');
const middleware = require("../jwtMiddleware/middleware");

// Register route

router.post('/register',
    async (req, res) => {
    console.log(req.body);
    try {
        if (req.body?.username && req.body?.password)
        {
            const {username, password} = req.body;
            const user = await usersService.register(username, password);
            if (user) {
                return res.status(200).send(user);
            }
            else {
                return res.status(400).send("An error has occurred. Please try changing your username or password.");
            }
        }
    }
    catch(error) {
    next(error); }
});


// Login route

router.post('/login',
    passport.authenticate('local',
        {session: false}),
        async (req, res) => {
        const id = req.user?._id;
        const token = await usersService.generateJWT(id);
        return res.status(200).send({token});
});

//JWT middleware

router.use('/me',passport.authenticate('jwt', {session:false, failureRedirect:'/login'}));


// Get self

router.get('/me', middleware.canAccess(['admin','user']),async (req, res) => {
    const user = await usersService.getUser(req.user._id)
    return res.status(200).send(user);
});

router.patch('/me', middleware.canAccess(['admin','user']),
    async (req, res) => {
        const updatedUser = await usersService.update(req,res);
        return res.status(200).send(updatedUser);
});

router.delete('/me', middleware.canAccess(['admin']),
    async (req, res) => {
        return res.status(200).send(await(usersService.deleteUser(req.user._id)));
});


// Get all users : remember to not return users passwords on this route

router.get('/', middleware.canAccess(['admin','user']),
    async (req, res) => {
    const allUser = await(usersService.findAll())
    return res.status(200).send(allUser);
});


module.exports = router