const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

require('dotenv').config()
mongoose.connect(process.env.MONGO_URI).then(() => {console.log('Connected!') })

const bodyParser = require('body-parser')
const passport = require('passport')

const userController = require('./users/users.controller')
const locationController = require('./locations/locations.controller')


app.use(bodyParser.json());
app.use('/locations',locationController);
app.use('/users',userController);
app.use(express.json());
app.use(passport.initialize());

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

app.get('/', (req, res) => {
	return res.status(200).send({
		message:"Hello. Please don't forget to provide a bearer token to access the locations",
		startpoints: ["/users","/locations"]
	})
})

/* Question 5 : Implement a "Hello World" route, on GET / that returns "Hello World" */

/*
app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})
*/