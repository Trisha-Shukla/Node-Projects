import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Header = () => {
  console.log("Reached Header")
  const [isAuth,setIsAuth]=useState(false);
  const navigate=useNavigate();

  const checkStatus=async()=>{
    try {
      console.log("entered");
      
      const res=await axios.get("http://localhost:8080/api/auth/check",{withCredentials:true});
      console.log(res.data);
      if(res.status===200){

        setIsAuth(res.data.isAuthenticated);
      }
      else{
        setIsAuth(false)
      }
      
    } catch (error) {
      setIsAuth(false)
      navigate("/")
    }
    
  }
  async function logout(){
    try {
      console.log("logout");
      
      const res=await axios.post("http://localhost:8080/api/user/logout",{withCredentials:true})
      console.log(res.data);
      
      if(res.status===201){
        console.log("Reached 201");
        
        setIsAuth(false);
        navigate("/");
      }
      
    } catch (error) {
      console.log("Error logging out"+error);
      
    }
  }
  useEffect(()=>{
    checkStatus();
  },[])
  return (
      <div className='flex justify-evenly gap-3 p-4'>
        <Link to={'/'}>Home</Link>
        {/* {!isAuth?<Link to={'/login'}>Login </Link>: <div onClick={logout}>Logout</div> } */}
        {isAuth? <div onClick={logout}>Logout</div>:<Link to={'/login'}>Login </Link> }
        {
          isAuth && <Link to={'/project'}>Project</Link>
        }
        
    </div>
  )
}

export default Header