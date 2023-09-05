import { Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, IconButton, Input, Radio, RadioGroup, Stack, Textarea } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getTaskData, updateTaskData } from '../redux/app/action'
import {DeleteIcon} from "@chakra-ui/icons"

export const EditTask = () => {
  const {task}=useSelector((store)=>store.app)
  const dispatch=useDispatch()
  const {id}=useParams()
  const [title,setTitle]=useState("")
  const [description,setDescription]=useState("")
  const [task_status,setTaskStatus]=useState("")
  const [tag,setTag]=useState([])
  const [subTask,setSubTask]=useState([])
  const [subTaskTitle,setSubTaskTitle]=useState("")
  const [checkbox,setCheckbox]=useState([])
   
  useEffect(()=>{
    if(task.length===0){
      dispatch(getTaskData())
      
    }

  },[task,dispatch])

  useEffect(()=>{
    if(task){
      const currentTask=task.find((item)=>item._id===id)
      if(currentTask){

        setTitle(currentTask.title)
        setDescription(currentTask.description)
        setTaskStatus(currentTask.tasks_status)
        setTag(currentTask.tags)
        setSubTask(currentTask.subTasks)

        let data=currentTask.subTasks.filter((item)=>item.status && item.subTasksTitle).map((item)=>item.subTasksTitle)
        
        setCheckbox(data)
      }
      
    }

  },[task,id])
  
  const handleUpadte=(val,data)=>{
    if(val==="title"){
      dispatch(updateTaskData(id,{title:title,description:description}))
    }
    else if(val==="tasks_status"){
      console.log("her")
      dispatch(updateTaskData(id,{tasks_status:data}))
    }
    else if(val==="tags"){
      dispatch(updateTaskData(id,{tags:data}))
    }
    else if(val==="subTask"){
      if(subTaskTitle){

        var newSubTask=[...subTask,{subTasksTitle:subTaskTitle,status:false}]
        dispatch(updateTaskData(id,{subTasks:newSubTask}))
      }

    }
    else if(val==="updateSubTask"){
       const update=subTask.map((item)=>{
        if(data.includes(item.subTasksTitle)){
          return {...item,status:true}
        }
        else{
          return {...item,status:false}
        }

       })
       dispatch(updateTaskData(id,{subTasks:update}))
    }
    else if(val==="delete"){
      var deleteData=subTask.filter((item)=>item.subTasksTitle !==data)
      dispatch(updateTaskData(id,{subTasks:deleteData}))
    }
  }

  return (
    <Box>
      <Stack direction={'row'}>
        <Box>
          <Stack spacing={8} px={4} >
            <Stack >
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type='text'value={title} onChange={(e)=>setTitle(e.target.value)}/>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea value={description} onChange={(e)=>setDescription(e.target.value)}></Textarea>

              </FormControl>
              <Button onClick={()=>handleUpadte("title")}>update</Button>
            </Stack>
            <Stack >
              <RadioGroup value={task_status} onChange={(val)=>{setTaskStatus(val) 
                handleUpadte("tasks_status",val)}}  >
                <Stack>

                <Radio value='todo'>Todo</Radio>
                <Radio value='in-progress'>In-Progress</Radio>
                <Radio value='done'>Done</Radio>
                </Stack>
              </RadioGroup>
            </Stack>
            <Stack spacing={6} mt={6}>
              <CheckboxGroup value={tag} onChange={(val)=>{setTag(val)
              handleUpadte("tags",val)}}>
                <Checkbox value={'all'}>All</Checkbox>
                <Checkbox value={'personal'}>Personal</Checkbox>
                <Checkbox value={'offical'}>Offical</Checkbox>
                <Checkbox value={'other'}>Other</Checkbox>
              </CheckboxGroup>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Stack>
            <Box>
              <Stack>
                <FormControl>
                  <FormLabel>Add-SubTask</FormLabel>
                  <Input type='text' onChange={(e)=>setSubTaskTitle(e.target.value)}/>

                </FormControl>
                <Button onClick={()=>handleUpadte("subTask")}>Add</Button>
              </Stack>
              <Stack mt={6}>
                <CheckboxGroup value={checkbox} onChange={(val)=>{setCheckbox(val)
                handleUpadte("updateSubTask",val)}}>
                  {subTask.length >0 && subTask.map((item,ind)=><Stack direction={'row'} justifyContent={'space-between'} key={ind}>
                    <Checkbox value={item.subTasksTitle}>{item.subTasksTitle}</Checkbox>
                    <IconButton icon={<DeleteIcon/>} size={'sm'} variant={'outline'} onClick={()=>handleUpadte("delete",item.subTasksTitle)} />
                  </Stack>)}


                </CheckboxGroup>
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

