import React from 'react'
import {Route,Routes} from "react-router-dom"
import { Home } from './Home'
import { Login } from './Login'
import { Register } from './Register'
import { VerifyOtp } from '../component/VerifyOtp'
import { Forgetpassword } from '../component/Forgetpassword'
import { ResetPassword } from '../component/ResetPassword'
import { Stack } from '@chakra-ui/react'
import { SideBar } from '../component/SideBar'
import { EditTask } from '../component/EditTask'
import { Task } from './Task'
import { ReqAuth } from '../component/ReqAuth'
import { Navbar } from '../component/Navbar'

export const AllRoute = () => {
  return (
  
        <Routes>
            <Route path='/' element={<Stack direction={'row'}>
              <ReqAuth>

              <SideBar/>
              <Home/>
              </ReqAuth>
            </Stack>}/>
            <Route path='/auth/login' element={<Login/>}/>
            <Route path='/auth/login/forgetpassword' element={<Forgetpassword/>}/>
            <Route path='/auth/login/forgetpassword/resetpassword/:id' element={<ResetPassword/>}/>
            <Route path='/auth/verifyotp/:id' element={<VerifyOtp/>}/>
            <Route path='/auth/register' element={<Register/>}/>
            <Route path='/task' element={<Task/>}/>
            <Route path='/navbar' element={<Navbar/>}/>
            <Route path='/task/:id' element={<Stack direction={'row'}>
              <SideBar/>
              <EditTask/>
            </Stack>}/>
        </Routes>
  
  )
}
