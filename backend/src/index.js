const express=require("express")
const app=express()
const path=require("path")
const cors=require("cors")
const server=require("http").createServer(app)
const {Server}=require("socket.io")
const User=require("./moduleController/user")
const Task=require("./moduleController/task")
const passport=require("./config/passport")
const session=require("express-session")
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))



app.use(express.json())
app.use(passport.session())
app.use(cors())
require("dotenv").config()

const io=new Server(server,{
    cors:{
        origin:process.env.CLIENT_URL,
        methods:['GET','POST']

    }
})
app.use("/auth",User)
app.use("/task",Task)

app.use(express.static(path.join(__dirname,'build')))


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,'build','index.html'));
})


module.exports=server