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

module.exports = router