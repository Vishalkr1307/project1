const mongoose=require("mongoose")


const taskSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    tasks_status:{type:String, required:true},
    tags:[String],
    subTasks:[{subTasksTitle:{type:String,required:true},status:{type:Boolean,required:true}}]
})
module.exports=mongoose.model("task",taskSchema)