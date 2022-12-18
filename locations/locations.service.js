// This file holds the Business-Logic layer, interacting with Data Layer
const Location = require('./locations.model');

async function findAll () {
	return Location.find();
}
async function findOne({_id}) {
	try {
		return Location.findOne({_id}, null);
	} catch (err) {
		console.log("Something has occured while trying to retrieve the location");
		console.error(err);
		return null;
	}
}

async function createOne(location) {
	try {
		if (location === undefined) throw new Error("Undefined location");

		const { filmType, filmProducerName, endDate, filmName, district, geolocation, sourceLocationId, filmDirectorname, address, startDate, year } = location;
		await Location.create({ filmType,
			filmProducerName,
			endDate,
			filmName,
			district,
			geolocation,
			sourceLocationId,
			filmDirectorname,
			address,
			startDate,
			year
		});
		console.log("Location added");
		return true;

	} catch (err) {
		console.log("Error during the creation of the location");
		console.error(err);
		return false;
	}
}

async function deleteOne(id){
	try {
		const {_id} = id;
		await Location.findOneAndDelete({_id}).orFail();
		console.log(`Deleted ${_id}`);
		return true;
	} catch (e) {
		console.log("Error during the suppression of the location");
		console.error(err);
		return false;
	}
}

async function updateOne(id, property){
	try {
		const {_id} = id;
		await Location.findOneAndUpdate({_id}, property).orFail();
		console.log(`Updated ${_id}`);
		return true;
	} catch (e) {
		console.log("Error during the update of the location");
		console.error(err);
		return false;
	}
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.createOne = createOne
module.exports.deleteOne = deleteOne
module.exports.updateOne = updateOne
