const router = require('express').Router()
const passport = require('passport')
const usersService = require('./users.service')
const authorizationMiddleware = require ('../authorization/authorization.middleware')
require('../auth/jwt.stategy');
require('../auth/local.strategy');

router.post('/users/register', async(req,res) => {
    const user = await usersService.register(req.body?.username,
        req.body?.password)
    res.status(200).send(user)
})

router.post('/users/login',
    passport.authenticate('local',{session: false}),
    async (req,res) => {
        const userId = req.user?._id;
        const token = await usersService.generateJWT(userId);
        return res.status(200).send(token)
    }
)

router.get('/users/me', passport.authenticate('jwt',{session:false}), async(req,res) => {
    const me = await usersService.findOne(req.user._id)
	return res.status(200).send(me)
})

router.put('/users/me', passport.authenticate('jwt',{session:false}), async (req,res)=>{
	try {
		const me = await usersService.updateUser(req, res)
		return res.status(200).send(me)
	} catch(e) {
		return res.status(400).send("Bad Request, Try again !")
	}
})

router.delete('/users/me', passport.authenticate('jwt',{session:false}), async (req,res)=>{
    try{
        const me = await usersService.deleteUser(req.user._id)
        return res.status(200).send(me)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})

router.get('/users', 
	passport.authenticate('jwt',{session:false}),
	authorizationMiddleware.canAccess(['admin','modo']),
	async (req, res) => {
		try {
			const allUsers = await usersService.findAll()
			return res.status(200).send(allUsers)
		} catch(e) {
			return res.status(400).send("Bad Request, Try again !")
		}
})

// JWT middleware
router.use('/users/me',passport.authenticate('jwt', {
    session:false, failureRedirect:'/users/login'
}));

module.exports = router