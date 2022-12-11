const User = require('./users.model')
const bcrypt = require('bcrypt')

async function register (username,password){
    const hash = await bcrypt.hash(password,10)
    const user = new User({username, password:hash})
    return await user.save()
}

async function checkPassword(username, password){
    const user = await User.findOne({username})
    if (!user) {return false}
    const match = await bcrypt.compare(password, user.password)
    if (!match){
        return false
    }
    return user 
}

async function findOne(id){
	const user = await User.findById(id)
	if (!user) throw new Error("User not found")
	return user
}

async function updateUser(id, update){
	await User.findOneAndUpdate(id, update)
	return User.findOne(id)
}


module.exports = {register, checkPassword, findOne, updateUser}