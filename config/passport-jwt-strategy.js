const passport=require('passport');
const JWTStrategy=require('passport-jwt').Strategy;
const ExtractJWt=require('passport-jwt').ExtractJwt;

const Employee=require('../models/login');

let opts={
    jwtFromRequest: ExtractJWt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'placementCell'
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done) {
    Employee.findById(jwtPayLoad._id, function(err, user) {
        if (err) {
            console.log('err in finding the user in jwt',err);
            return;
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

module.exports=passport;