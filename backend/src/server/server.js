const server=require("..//index")
const connect=require("..//config/db")
require("dotenv").config()
const port=process.env.PORT||8000

server.listen(port,async (req,res)=>{
    await connect()
    console.log(`listening on ${port}`)
})