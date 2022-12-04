// This file holds the Business-Logic layer, interacting with Data Layer

const Location = require('./locations.model')

async function findAll () {
	const locations = await Location.find()
    if (!locations) throw new Error("Locations not found")
    return locations
}

async function findOne(id){
	const location = await Location.findById(id)
	if (!location) throw new Error("Location not found")
	return location
}

async function addLocation(data){
	try{
		const instance = new Location(data)
		return instance.save()
	}catch(e){
		throw new Error("Missing film name")
	}
}

async function updateLocation(id, update){
	return Location.updateOne({_if:id}, update)
}

async function deleteLocation(id){
    const location = await findOne(id)
    return location.remove
}

module.exports.findAll = findAll
module.exports.findOne = findOne
module.exports.addLocation = addLocation
module.exports.updateLocation = updateLocation
module.exports.deleteLocation= deleteLocation

