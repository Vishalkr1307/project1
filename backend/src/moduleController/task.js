const express=require("express")
const Task=require("..//module/task")
const task = require("..//module/task")
const router=express.Router()
const Authinocate=require("..//middleware/authonicate")

router.post("",Authinocate,async (req,res)=>{
    try{
        const task=await Task.create(req.body)
        

        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.get("",async (req,res)=>{
    try{
        const task=await Task.find().lean().exec()


        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.get("/:id",async (req,res)=>{
    try{
        const task=await Task.findById(req.params.id).lean().exec()
        

        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.patch("/:id",async (req,res)=>{
    try{
        await Task.findByIdAndUpdate(req.params.id,req.body).lean().exec()
        const updateTask=await Task.findById(req.params.id).lean().exec()

        return res.status(200).send(updateTask)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
router.delete("/:id",async (req,res)=>{
    try{
        await Task.findByIdAndDelete(req.params.id).lean().exec()

        return res.status(200).send(task)

    }
    catch(err){
        return res.status(400).send("bad request")
    }
})
module.exports=router