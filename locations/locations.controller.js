// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')

// Retrieve data of all locations
router.get('/locations', async (req, res) => {
	//return res.status(200).send({locations: []})
	const allLocations = await locationsService.findAll()
	res.json(allLocations)
})

// Create routes at Presentation Layer = use POST method route
router.post('/locations', async (req, res) => {
	try{
		const locations = await locationsService.addLocation({...req.body})
		return res.status(200).send(locations)
	}catch (e){
		if (e.message === "Missing film name") return res.status(400).send("The film name is not here, how am I supposed to add this")
        return res.status(400).send("Bad Request, Try again !")
	}
  });

module.exports = router
