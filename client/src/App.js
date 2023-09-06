

import { Stack } from '@chakra-ui/react';
import { LandingPage } from './component/LandingPage';
import { AllRoute } from './page/AllRoute';
import { useEffect, useState } from 'react';
import { Navbar } from './component/Navbar';

function App() {
  const [loading,setLoading]=useState(true)
  useEffect(()=>{
    setTimeout(()=>{
      setLoading((va)=>!loading)

    },10000)
  },[])
  return (
    <>
      {/* {loading && <LandingPage/>} */}
      <Stack>
      <Navbar/>

       <AllRoute/>
      </Stack>
    </>
  );
}

export default App;
