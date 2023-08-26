const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport=require("passport")
const User=require("..//module/user")
const { uuid } = require('uuidv4');
const newToken=require("..//util/token")
require("dotenv").config()

passport.use(new GoogleStrategy({
    clientID:   process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
    passReqToCallback   : true
  },
   async function(request, accessToken, refreshToken, profile, done) {
    
    let user=await User.findOne({email:profile._json.email})
    if(!user){
        user=await User.create({name:profile._json.name, email:profile._json.email,password:uuid()})
    }
    const token=newToken(user)
    return done(null, {user, token})
  }
));
module.exports=passport