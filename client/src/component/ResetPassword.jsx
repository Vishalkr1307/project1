import { Box, Button, FormControl, FormLabel, Input, Spinner, Stack, useColorModeValue } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { postResetPasswordData } from '../redux/auth/action'

export const ResetPassword = () => {
    const {id}=useParams()
    const [text,setText]=useState({newPassword:""})
    const bgColor=useColorModeValue("gray.50",'gray.800')
    const {isLoading,isError,resetPassword}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleReset=()=>{
        if(id && text){
            dispatch(postResetPasswordData(id, text))
        }
    }
    useEffect(()=>{
        if(!isLoading && !isError && resetPassword){
            navigate("/auth/login",{replace:true})
        }

    },[isLoading,isError,resetPassword])

  return (
    <Box display={'flex'} bg={bgColor} minH={'100vh'} justifyContent={'center'} alignItems={'center'}>
        <Stack>
            <FormControl>
                <FormLabel>New-Password</FormLabel>
                <Input type='text' onChange={(e)=>setText({newPassword:e.target.value})}/>
            </FormControl>
            <Button onClick={handleReset}>{isLoading?<Spinner/>:"Reset-Password"}</Button>
        </Stack>
    </Box>
  )
}
