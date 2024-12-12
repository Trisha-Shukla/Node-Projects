import axios from 'axios';
import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'

const VerifyEmail = () => {
    const URL=new URLSearchParams(window.location.search);
    const [message,setMessage]=useState("");
    // console.log(URL);
    const token=URL.get("token");
    const navigate=useNavigate();
    const sendTokenToBackend=async()=>{
        try {
            console.log("res sending");
            
            const res=await axios.post("http://localhost:8080/api/auth/verify-token",{token})
            console.log("res sended");
            console.log(res);
            
            if(res.status===200){
                return navigate('/login');
            }
            if (res.status === 404) setMessage(response.message);
            
        } catch (error) {
            console.log("token expired reached");
            
            console.log(error);
            
        }
    }

    if(!token){
        return (
            <h2>Retuen to <Link to={'/'}>home</Link></h2>
        )
    }
    else{
        sendTokenToBackend();
    }

    
  return (
    <>{message.length > 0 ? <h3>{message}</h3> : ""}</>
  )
}

export default VerifyEmail