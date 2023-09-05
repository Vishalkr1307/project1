import { Box, Heading,Text, Stack, useColorModeValue, FormControl, FormLabel, Input, Flex, Checkbox, Button, Spinner, Alert, AlertIcon } from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from "react-redux"
import { postLoginData } from '../redux/auth/action'
const init={
    email:"",
    password:""
}
const reducer=(store,{type,payload})=>{
    switch(type){
        case 'email':
            return {...store,email: payload}
        case 'password':
            return {...store,password: payload}
        default:
            return {...store}
    }

}


export const Login = () => {
    const [text,setText]=useReducer(reducer,init)
    const {isLoading,isError,isAuth,user}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const loaction=useLocation()
    const handleLogin=()=>{
        if(text.email.trim()!=="" || text.password.trim()!==""){
            dispatch(postLoginData(text))
        }

    }
    useEffect(()=>{
        if(user.userId && !isError && !isLoading){
            navigate(`/auth/verifyotp/${user.userId}`,{replace:true,state:{from:loaction}})
        }

    },[user,isError,isLoading,handleLogin])
    
    const bgColor=useColorModeValue("gray.50",'gray.800')
  return (
    <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} bg={bgColor}>
        <Stack spacing={6}>
            <Box px={18} py={6}>
                <Stack alignItems={'center'}>
                <Heading fontSize={'4xl'}>Sign in to Your account </Heading>
                    
                <Text fontSize={'lg'} color={'gray.600'}>to enjoy of our cool  <span color={'blue.400'}>features</span></Text>
                </Stack>
            </Box>
            <Box bg={'white'} py={10} px={18} rounded={'xl'} boxShadow={'lg'}>
                {isError && !isLoading && !isAuth  && <Alert status='error'>
                    <AlertIcon/>
                    {isError}
                    </Alert>}
                <Stack spacing={6} py={2}>
                    <FormControl id='email'>
                        <FormLabel>Email</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"email",payload:e.target.value})}/>
                    </FormControl>
                    <FormControl id='password'>
                        <FormLabel>Password</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"password",payload:e.target.value})}/>
                    </FormControl>
                    <Flex justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                        <Text color={'blue.400'}><Link to="/auth/login/forgetpassword">Forget password</Link></Text>
                    </Flex>
                    <Stack>
                        <Button bg={'blue.400'} py={6} onClick={handleLogin}>{isLoading?<Spinner/>:"Login"}</Button>
                    </Stack>

                    <Stack alignItems={'center'}>
                        <Text>Did'nt have a account ? <Link color='blue.400' to="/auth/register">Register</Link></Text>
                    </Stack>
                    

                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}
