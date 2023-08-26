const mongoose=require("mongoose")
require("dotenv").config()

module.exports=()=>{
    return mongoose.connect(process.env.DB).then((res)=>console.log("connect success")).catch(()=>console.log("connect error"))
}