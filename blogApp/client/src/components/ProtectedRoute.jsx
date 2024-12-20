import React from 'react'
import { Navigate } from 'react-router-dom';
import Profile from './Profile';

const ProtectedRoute = () => {
  const [isAuth,setIsAuth]=useState(false);

  const checkStatus=async()=>{
    try {
      console.log("entered");
      
      const res=await axios.get("http://localhost:8080/api/auth/check",{withCredentials:true});
      console.log(res.data);
      setIsAuth(res.data.isAuthenticated);
      
    } catch (error) {
      setIsAuth(false)
    }
    
  }
  useEffect(()=>{
    checkStatus();
  },[])
  return (
    isAuth ? <Profile /> : <Navigate to="/login" replace />
  )
}

export default ProtectedRoute