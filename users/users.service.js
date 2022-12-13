const User = require('./users.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

async function register (username,password){
    const hash = await bcrypt.hash(password,10) //salt = 10
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
	const user = await User.findById({'_id':id})
	if (!user) throw new Error("User not found")
	return user
}

async function updateUser(req, res){
    let obj = {
        username: req.body.username,
        password: await bcrypt.hash(req.body.password, 10),
        role: req.user.role
    }
    const user = await User.findOneAndUpdate(req.user._id, obj, {new:true});
    res.send(user)
}

async function deleteUser(id){
    const user = await findOne(id)
    return user.remove()
}

async function findAll () {
	const users = await User.find().select('username').select('role')
    if (!users) throw new Error("Users not found")
    return users
}

async function generateJWT(username) {
    return jwt.sign({sub:username}, process.env.JWT_SECRET);
}

module.exports = {register, checkPassword, findOne, updateUser, deleteUser, findAll, verify, generateJWT}