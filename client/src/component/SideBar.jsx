import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { getTaskData } from '../redux/app/action'

export const SideBar = () => {
    const {task}=useSelector((store)=>store.app)
    const {user}=useSelector((store)=>store.app)
    const dispatch=useDispatch()
    const All=task.length
    const personal=task.filter((task)=>task.tags.includes("personal")).length
    const offical=task.filter((task)=>task.tags.includes("offical")).length
    const other=task.filter((task)=>task.tags.includes("other")).length
    const [serchParam,setSerchParam]=useSearchParams()
    const [tag,setTag]=useState([])

    const handleTag=(val)=>{
        let newParam=[...tag]
        if(tag.includes(val)){
            newParam.splice(tag.indexOf(val),1)
        }
        else{
            newParam.push(val)

        }
        setTag(newParam)

    }
    useEffect(()=>{
        if(task.length==0){
            dispatch(getTaskData())

        }

    },[task])

    useEffect(()=>{
        if(tag){
            setSerchParam({tags:tag},{replace:true})

        }

    },[tag,serchParam,setSerchParam])
    console.log(user)
 
  return (
    <Box  width={'200px'} height={'80vh'} px={2}>
        <Stack>
            <Box height={'200px'}>
                <Text>{user?user.name:"Profile-detail"}</Text>
            </Box>
            <Box  height={'250px'}>
                <Stack>
                    <Flex justifyContent={'space-between'} alignItems={'center'} px={2} onClick={()=>handleTag("all")}>
                    <Text fontSize={'xl'}>All</Text>
                        <Text>{All}</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} px={2} onClick={()=>handleTag("personal")}>
                        <Text fontSize={'xl'}>Personal</Text>
                        <Text>{personal}</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} px={2} onClick={()=>handleTag("offical")}>
                        <Text fontSize={'xl'}>Offical</Text>
                        <Text>{offical}</Text>
                    </Flex>
                    <Flex justifyContent={'space-between'} alignItems={'center'} px={2} onClick={()=>handleTag("other")}>
                        <Text fontSize={'xl'}>Other</Text>
                        <Text>{other}</Text>
                    </Flex>
                </Stack>
            </Box>
            <Box height={'10%'}>
                <Stack>
                    <Button onClick={()=>{localStorage.removeItem("token")
                    window.location.reload()
                    }}>Logout</Button>

                </Stack>
            </Box>

        </Stack>
    </Box>
  )
}
