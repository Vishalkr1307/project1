import { Box, Heading,Text, Stack, useColorModeValue, FormControl, FormLabel, Input, Flex, Checkbox, Button, Alert, AlertIcon, Spinner } from '@chakra-ui/react'
import React, { useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { postRegisterData } from '../redux/auth/action'
const init={
    name:"",
    email:"",
    password:""
}
const reducer=(store,{type,payload})=>{
    switch(type){
        case  "name":
          return {...store,name:payload}
        case 'email':
            return {...store,email: payload}
        case 'password':
            return {...store,password: payload}
        default:
            return {...store}
    }

}


export const Register = () => {
    const [text,setText]=useReducer(reducer,init)
    const {isLoading,isError,user}=useSelector((store)=>store.auth)
    const dispatch=useDispatch()
    const naviagte=useNavigate()
    const location=useLocation()
    const handleRegister=()=>{
      if(text){
        dispatch(postRegisterData(text))
      }
       

    }
    useEffect(()=>{
        if(user.userId){
            naviagte(`/auth/verifyotp/${user.userId}`,{replace:true,state:{from:location}})

        }

    },[user.userId])
    const bgColor=useColorModeValue("gray.50",'gray.800')
  return (
    <Box minH={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} bg={bgColor}>
        <Stack spacing={6}>
            <Box px={18} py={6}>
                <Stack alignItems={'center'}>
                <Heading fontSize={'4xl'}>Sign Up to Your account </Heading>
                    
                <Text fontSize={'lg'} color={'gray.600'}>to enjoy of our cool  <span color={'blue.400'}>features</span></Text>
                </Stack>
            </Box>
            <Box bg={'white'} py={10} px={18} rounded={'xl'} boxShadow={'lg'}>
                <Stack spacing={6}>
                    <Stack>
                    {user && isError && <Alert status='error'>
                        <AlertIcon/>
                        {isError}
                        </Alert>}

                    </Stack>
                    <FormControl id='name'>
                        <FormLabel>Name</FormLabel>
                        <Input type='text' onChange={(e)=>setText({type:"name",payload:e.target.value})}/>
                    </FormControl>
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
                        <Text color={'blue.400'}><Link to="/auth/forgetpassword">Forget password</Link></Text>
                    </Flex>
                    <Stack>
                        <Button onClick={handleRegister}>{isLoading?<Spinner/>:"Register Now"}</Button>
                    </Stack>

                    <Stack alignItems={'center'}>
                        <Text>Already have a account ? <Link color='blue.400' to="/auth/login">Login</Link></Text>
                    </Stack>
                    

                </Stack>
            </Box>
        </Stack>
    </Box>
  )
}
