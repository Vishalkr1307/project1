

import { LandingPage } from './component/LandingPage';
import { AllRoute } from './page/AllRoute';
import { useEffect, useState } from 'react';

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
       <AllRoute/>
    </>
  );
}

export default App;
