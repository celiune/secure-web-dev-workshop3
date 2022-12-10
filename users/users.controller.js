const router = require('express').Router()
const passport = require('passport')
const usersService = require('./users.service')

router.post('/register', async(req,res) => {
    const user = await usersService.register(req.body?.username,
        req.body?.password)
    res.status(200).send(user)
})

router.post('/login',
    passport.authenticate('local'),
    async (req,res) => {
        res.status(200).send(req.user)
    }
)


module.exports = router