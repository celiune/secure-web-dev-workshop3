// This file is used to map API calls (Presentation Layer) with the
// Business-Logic layer

const router = require('express').Router()
const locationsService = require('./locations.service')
const passport = require('passport')
const authorizationMiddleware = require('../authorization/authorization.middleware')
require('../auth/local.strategy');
require('../auth/jwt.stategy');

router.use('/locations', passport.authenticate('jwt', { session: false }));

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

//Update: /locations/:id
router.put('/locations/:id', async (req,res)=>{
	try {
		console.log("Coucou")
		//const location = await locationsService.updateLocation(req.params.id, {...req.body, endDate:new Date(req.body.endDate), startDate: new Date(req.body.startDate)})
		const location = await locationsService.updateLocation(req.params.id, req.body)
		
		return res.status(200).send(location)
	} catch(e) {
		return res.status(400).send("Bad Request, Try again !")
	}
})

// Request (Get All: /locations , Get One: /locations/:id)
// Retrieve data of all locations
router.get('/locations', 
	passport.authenticate('local',{session:false}),
	authorizationMiddleware.canAccess(['admin','modo']),
	async (req, res) => {
		try {
			const allLocations = await locationsService.findAll()
			return res.status(200).send(allLocations)
		} catch(e) {
			return res.status(400).send("Bad Request, Try again !")
		}
})

// Retrieve data of one location
router.get('/locations/:id', async (req, res) => {
	const location = await locationsService.findOne(req.params['id'])
	return res.status(200).send(location)
})

// Delete: /locations/:id
router.delete('/locations/:id', async (req,res)=>{
    try{
        const location = await locationsService.deleteLocation(req.params['id'])
        return res.status(200).send(location)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})

module.exports = router
