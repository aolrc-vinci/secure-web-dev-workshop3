const express = require('express')
const locationController = require('./locations/locations.controller')
const app = express()
const port = 3000

require('dotenv').config()

const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI).then(()=> console.log("Connected")).catch((error) => console.log("Error"))



app.use(locationController)

app.listen(port, () => {
	console.log(`API listening on port ${port}, visit http://localhost:${port}/`)
})

mongoose.connection.close();