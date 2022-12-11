const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000

require('dotenv').config()

const bodyParser = require('body-parser')

const userController = require('./users/users.controller')
const passport = require('passport')

app.use(express.json())
app.use(bodyParser.json())
app.use(passport.initialize())

app.use(locationController)
app.use(userController)


app.get('/', (req, res) => {
	return res.status(200).send({
		message:"Hello, don't forget to provide a bearer token to access to locations",
		startpoints: ["/users","/locations"]
	})
})

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})
