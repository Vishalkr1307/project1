const mongoose=require("mongoose")

const otpSchema=new mongoose.Schema({
    userId:{type:String, required:true},
    otp:{type:String, required:true},
    createdAt:{type:Date},
    expiresAt:{type:Date}
})
module.exports=mongoose.model("otp",otpSchema)