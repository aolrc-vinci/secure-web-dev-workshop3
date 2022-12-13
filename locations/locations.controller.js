// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer
const passport = require("passport");
const router = require('express').Router();
const locationsService = require('./locations.service');
const localStrategy = require('../auth/local-strategy');
const jwtStrategy = require('../auth/jwt-strategy');

router.use('/locations', (passport.authenticate('jwt', {session: false})));
router.route('/locations/:id')
	.get(async (req, resp) => {
		const loc = await locationsService.locationId(req.params.id)
		if (loc) {
			return resp.status(200).send({location: loc})
		}
		else
			return resp.status(404).send({err: "Location not found"})
	})
	.delete(async (req, resp) => {
		const loc = await locationsService.deleteLocationFromId(req.params.id)
		if (loc) {
			return resp.status(200).send({location: loc})
		}
		else
			return resp.status(404).send({err: "Failed to delete"})
	})
	.put(async (req, resp) => {
		const loc = await locationsService.updateLocation(req.params.id, req.body)
		if (loc) {
			return resp.status(200).send({location: loc})
		}
		else
			return resp.status(404).send({err: "Failed to update"})
	})
router.route('/locations')
	.get(async (req, resp) => {
		const locs = await locationsService.findAll()
		if (locs) {
			return resp.status(200).send({locations: locs})
		}
		else
			return resp.status(404).send({err: "An error has occurred"})
	})
	.post(async (req, resp) => {
		const loc = await locationsService.addLocation(req.body)
		if (loc) {
			return resp.status(200).send({location: loc})
		}
		else
			return resp.status(404).send({err: "An error has occurred"})
	})
router.get('/test',(request,response) => {
	return response.status(200).send("Hello World");
});




module.exports = router
