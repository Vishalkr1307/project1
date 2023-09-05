import { Alert, Box, Button,Text, Heading,HStack, PinInput, PinInputField, Stack, useColorModeValue, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { postResendData, postVerifyOtp } from '../redux/auth/action'

export const VerifyOtp = () => {
    const [text,setText]=useState("")
    const bgColor=useColorModeValue("gray.50","gray.800")
    const {user,verifyStatus,token,forgetPassword,isError,isLoading}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const {id}=useParams()
    const naviagte=useNavigate()
    const loaction=useLocation()
    console.log(loaction)

    
    
    
    useEffect(()=>{
        if(!isError && verifyStatus){
            alert(verifyStatus)
            naviagte(loaction?.state?.from?.pathname ==='/auth/login' ? '/':loaction?.state?.from?.pathname ==="/auth/register"?'/auth/login':`/auth/login/forgetpassword/resetpassword/${user.userId}`,{replace: true})
        }

    },[isError,verifyStatus])
    
    const handleButton=()=>{
        if(text){
            dispatch(postVerifyOtp(id,{otp:text}))
        }
        setText("")
        

    }
    const handleResend=()=>{
        if(user){
           const data={
            userId:user.userId,
            email:user.email,
            name:user.name

            }
            dispatch(postResendData(data))
        }
    }
    useEffect(()=>{

    },[user])
    

  return (
    <Box bg={bgColor} minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
        <Stack spacing={6} >
            <Stack alignItems={'center'}spacing={4}>
                <Heading>otp sent to your email{user?.email} </Heading>
                {isError && <Alert status='error'>
                    <Alert/>
                    {isError}
                    </Alert>}
            <HStack >
                <PinInput  otp size={'md'} value={text} onChange={(val)=>setText(val)}>
                    <PinInputField/>
                    <PinInputField/>
                    <PinInputField/>
                    <PinInputField/>
                </PinInput>

            </HStack>
            <Stack>
                <Text color={"blue.400"} as={'button'} onClick={handleResend} cursor={'pointer'}>{isLoading?<Spinner/>:"Resend-it"}</Text>
            </Stack>

            </Stack>
            <Stack>

                <Button onClick={handleButton}>{isLoading?<Spinner/>:"Verify-otp"}</Button>
            </Stack>

        </Stack>
    </Box>
  )
}
