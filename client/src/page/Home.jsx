import { Box, Stack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTaskData } from '../redux/app/action'
import { TaskCard } from '../component/TaskCard'
import { TaskStatus } from '../component/TaskStatus'

export const Home = () => {
  const {loading,error,task}=useSelector((store)=>store.app)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(task.length==0){
      dispatch(getTaskData())
    }
  },[task])
  
  return (
    <Box>
      <Stack direction={'row'} justifyContent={'space-evenly'} minH={'100vh'} spacing={4}>
        <Box border={'1px solid green'} width={'200px'} >
          <TaskStatus task={task} task_status={"todo"}/>
        </Box>
        <Box border={'1px solid green'} width={'200px'}>
       
         <TaskStatus task={task} task_status={"in-progress"}/>


        </Box>
        <Box border={'1px solid green'} width={'200px'}>
        <TaskStatus task={task} task_status={"done"}/>


        </Box>
      </Stack>
    </Box>
  )
}
