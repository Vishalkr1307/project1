import { Box, Heading, Stack } from '@chakra-ui/react'
import React from 'react'
import { TaskCard } from './TaskCard'
import { useSearchParams } from 'react-router-dom'

export const TaskStatus = ({task,task_status}) => {
    const [serchParam]=useSearchParams()
    const filterByParamTag=(task)=>{
        const newParamtag=serchParam.getAll("tags")

        if(newParamtag.includes("all") || newParamtag.length==0){
            
            return task
        }
        const data=task.tags.filter((item)=>newParamtag.includes(item)?true:false)

        
       
       
        
        

        if(data.length){
            return task
        }
        
         return false
        

    }
    
  return (
    <Box>
        <Stack>
            <Stack alignItems={'center'}>
                <Heading fontSize={'xl'}>{task_status.toUpperCase()}</Heading>
            </Stack>
            <Stack spacing={4}>
                {task.length>0 && task.filter((task)=>task.tasks_status==task_status).filter(filterByParamTag).map((task,ind)=><TaskCard key={ind} {...task}/>)}
            </Stack>

        </Stack>
    </Box>
  )
}
