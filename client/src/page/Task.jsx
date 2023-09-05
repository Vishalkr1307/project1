import { Alert, AlertIcon,Text, Box, Button, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Radio, RadioGroup, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postTaskData } from '../redux/app/action'

export const Task = () => {
    const bgColor=useColorModeValue("gray.50","gray.800")
    const [title,setTitle]=useState("")
    const [description,setDiscription]=useState("")
    const [task_status,setTask_status]=useState("")
    const [tag,setTag]=useState([])
    const [subTask,setSubTask]=useState([])
    const [subtaskTitle,setSubTaskTitle]=useState("")
    const {task,loading,error,success}=useSelector((store)=>store.app)
    const {token}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const handleTask=()=>{
        const data={
            title:title,
            description:description,
            tasks_status:task_status,
            tags:tag,
            subTasks:[{subTasksTitle:subtaskTitle,status:false}]
        }
        if(data && token){

            dispatch(postTaskData(token,data))
        }
        
    }
    
  return (
    <Box display={'flex'} bg={bgColor} minH={'100vh'} justifyContent={'center'} alignItems={'center'} rounded={'xl'}>
        <Stack>
            <Box bg={useColorModeValue("white",'white.100')} px={10} py={8}>
                {error && !success && <Alert status='error'>
                    <AlertIcon/>
                    {error}
                    </Alert>}
                {!error && success && <Alert>
                    <AlertIcon/>
                    <Text>Task added successfully</Text>
                    </Alert>}
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>title</FormLabel>
                        <Input type='text' onChange={(e)=>setTitle(e.target.value)}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input type='text' onChange={(e)=>setDiscription(e.target.value)}/>
                    </FormControl>
                    

                    <RadioGroup value={task_status} onChange={(val)=>setTask_status(val)}>
                        <Stack>
                        <Radio value='todo'>Todo</Radio>
                        <Radio value='in-progress'>In-Progress</Radio>
                        <Radio value='done'>Done</Radio>

                        </Stack>
                    </RadioGroup>
                    
                    <CheckboxGroup value={tag} onChange={(val)=>setTag(val)}>
                        <Checkbox value='all'>All</Checkbox>
                        <Checkbox value='personal'>Personal</Checkbox>
                        <Checkbox value='offical'>Offical</Checkbox>
                        <Checkbox value='other'>Other</Checkbox>
                    </CheckboxGroup>
                    <FormControl>
                        <FormLabel>ADD-SubTask</FormLabel>
                        <Input type='text' onChange={(e)=>setSubTaskTitle(e.target.value)}/>
                    </FormControl>
                    <Stack mt={6}>
                        <Button onClick={handleTask}>ADD-Task</Button>
                    </Stack>
                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}
