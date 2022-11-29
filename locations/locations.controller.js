// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')


router.get('/locations', async (req, res) => {
	return res.status(200).send({locations: await locationsService.findAll()})
})

router.get('/locations/:id', async (req, res) => {
	return res.status(200).send({location: await locationsService.findOne(req.params.id)})
})

router.delete('/locations/:id', async (req, res) => {
	return res.status(200).send({params: await locationsService.eraseOne(req.params.id)})
})

router.post('/locations/', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({location: await locationsService.Create(req.body)})
})

router.patch('/locations/', async (req, res) => {
	console.log(req.body)
	return res.status(200).send({location: await locationsService.Patch(req.body)})
})



module.exports = router
