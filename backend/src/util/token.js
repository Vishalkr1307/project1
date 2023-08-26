const jwt=require("jsonwebtoken")
require("dotenv").config()

module.exports=(user)=>{
    return jwt.sign({user:user,exp:Math.floor(Date.now()/1000)+60*60*60},process.env.PRIVATE_KEY)
}

