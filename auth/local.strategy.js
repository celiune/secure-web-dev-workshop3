const { model } = require('mongoose');
const passport = require('passport')
const LocalStrategy = require('passport-local')
const usersService = require('../users/users.service')

passport.use(new LocalStrategy) (
	async function(username, password, done){
        try{
            const user = await usersService.checkPassword(username, password)
            if (!user){
                return done(null, false);
            }
            return done(null, user);
        }catch(err){
            if (err) {
                return done(err);           
            }
        }    
	}
);

module.exports = passport