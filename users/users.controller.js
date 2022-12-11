const router = require('express').Router()
const passport = require('passport')
const usersService = require('./users.service')

router.post('/users/register', async(req,res) => {
    const user = await usersService.register(req.body?.username,
        req.body?.password)
    res.status(200).send(user)
})

router.post('/users/login',
    passport.authenticate('local',{session: false}),
    async (req,res) => {
        res.status(200).send(req.user)
    }
)

router.get('/users/me', async(req,res) => {
    const me = await usersService.findOne(req.user)
	return res.status(200).send(me)
})

router.put('/users/me', async (req,res)=>{
	try {
		const me = await usersService.updateUser(req.user, req.body)
		return res.status(200).send(me)
	} catch(e) {
		return res.status(400).send("Bad Request, Try again !")
	}
})

router.delete('/users/me', async (req,res)=>{
    try{
        const me = await usersService.deleteUser(req.user)
        return res.status(200).send(me)
    } catch(e) {
        return res.status(400).send("Bad Request, Try again !")
    }
})

router.get('/users', 
	passport.authenticate('local',{session:false}),
	authorizationMiddleware.canAccess(['admin','modo']),
	async (req, res) => {
		try {
			const allUsers = await usersService.findAll()
			return res.status(200).send(allUsers)
		} catch(e) {
			return res.status(400).send("Bad Request, Try again !")
		}
})

module.exports = router