const passport = require('passport');
const User = require('../users/users.model');
const { Strategy, ExtractJwt } = require('passport-jwt');

passport.use(new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),   // extract token from Authorization header as a Bearer token
            secretOrKey: process.env.JWT_SECRET                         // jwt secret extracted from .env
        },
        function(token, done) {
            User.findOne({id: token.sub}, function(err, user) {
                if (err) {
                    return done(err, false);     // error
                }   
                if (user){
                     return done(null, user?._id);   // user found
                }  
                return done(null, false);  // user not found
            });
        }
    )
);

module.exports = passport;