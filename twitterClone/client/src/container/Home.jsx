import React, { useEffect } from 'react'
import { Feed, LeftSideBar, RightSideBar } from '../components'
import { Outlet, useNavigate } from 'react-router-dom'
import useOtherUsers from '../hooks/getOtherUser.jsx'

import { useSelector } from 'react-redux'
import useGetMyTweets from '../hooks/getTweets.jsx'

const Home = () => {
  const {otherUser,user}=useSelector((state)=>state.userData)
  const navigate = useNavigate();

  useEffect(()=>{
    if (!user) {
      navigate("/login");
    }
  },[]);
  useOtherUsers()
  useGetMyTweets()

  
  return (
    <div className='flex justify-between w-[80%] mx-auto'>
        <LeftSideBar/>
        <Outlet/>
        <RightSideBar otherUser={otherUser}/>
    </div>
  )
}

export default Home