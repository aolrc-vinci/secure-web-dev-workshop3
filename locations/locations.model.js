const mongoose = require('mongoose')
require('dotenv').config();
console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_ROOT_URI);

const filmSchema = new mongoose.Schema({
	filmType: String,
	filmProducerName: String,
	endDate: Date,
	filmName: String,
	district: Number,
	geolocation: {
		coordinates: [Number],
		type: { type: String },
	},
	sourceLocationId: String,
	filmDirectorName: String,
	address: String,
	startDate: Date,
	year: Number,
})

const Location = mongoose.model('Location', filmSchema)

module.exports = Location
