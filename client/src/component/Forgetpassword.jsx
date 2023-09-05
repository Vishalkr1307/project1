import { Alert, AlertIcon, Box, Button, FormControl, FormLabel, Heading, Input, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postForgetData } from '../redux/auth/action'
import { useLocation, useNavigate } from 'react-router-dom'

export const Forgetpassword = () => {
    const [text,setText]=useState("")
    const bgColor=useColorModeValue("gray.50","gray.800")
    const {isLoading,user,isError}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const loaction=useLocation()
    const handleForget=()=>{
        dispatch(postForgetData({email:text}))

    }
    useEffect(()=>{
        if(user.userId && !isError && !isLoading){
            navigate(`/auth/verifyotp/${user.userId}`,{replace:true,state:{from:loaction}})
        }

    },[user,isError,isLoading])

  return (
    <Box display={'flex'} bg={bgColor} justifyContent={'center'} alignItems={'center'} minH={'100vh'}>
        <Stack alignItems={'center'} spacing={4}>
            {isError && <Alert status='error'>
                <AlertIcon/>
                {isError}
                </Alert>}

            <Heading>Forget-Password</Heading>
            <Text color={'blue.400'}>Please enter your email</Text>

           
            <Stack spacing={6}>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type='text' onChange={(e)=>setText(e.target.value)}/>
                </FormControl>
                <Button onClick={handleForget}>{isLoading?<Spinner/>:"Forget-Password"}</Button>
            </Stack>
            
            
        </Stack>
    </Box>
  )
}
