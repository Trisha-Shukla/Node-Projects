import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { FaRegFileImage } from "react-icons/fa";
import axios from 'axios'
import {TWEET_API_END_POINT} from '../utils/constant'
import {toast} from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { getIsActive, getRefresh } from '../store/tweetSlice';

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const {isActive}=useSelector(state=>state.tweetData)
    const dispatch=useDispatch();
    const submitHandler=async()=>{
        try {
          const res=  await axios.post(`${TWEET_API_END_POINT}/create`,{description},{withCredentials:true});
          console.log(res);
          dispatch(getRefresh());
          if (res.data.success) {
            toast.success(res?.data?.message);
            setDescription("")
        }
          
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const handleFeed=(e)=>{
        if(e.target.id==="forYou"){
            dispatch(getIsActive(true))
        }
        else{
            dispatch(getIsActive(false))
        }
    }
    
  return (
    <div className='w-[100%]'>
        <div>
            <div className='flex items-center justify-evenly border-b border-gray-200'>
                <div className={`${isActive? "border-b-2 border-blue-600": null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className='font-semibold text-gray-600 text-lg' id='forYou' onClick={(e)=>handleFeed(e)}>For you</h1>
                </div>
                <div className={`${!isActive? "border-b-2 border-blue-600": null} cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3`}>
                    <h1 className='font-semibold text-gray-600 text-lg' id='following' onClick={(e)=>handleFeed(e)}>Following</h1>
                </div>
            </div>
            {/* Avatar */}
            <div className=''>
                <div className='flex items-center p-4'>
                    <div>
                    <Avatar src="https://i.pravatar.cc/40" size="40" round={true} />
                    </div>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className='w-full outline-none border-none text-lg ml-2' placeholder="What is happening?" />
                </div>
                <div className='flex justify-between items-center p-4 border-b'>
                    <div className='cursor-pointer'>
                        <FaRegFileImage/>
                    </div>
                    <button onClick={submitHandler} className='bg-[#1D98F0] px-4 py-1 text-white rounded-full active:scale-95 transition-all duration-200 ease-in-out'>Post</button>
                </div>
            </div>
                
        </div>
    </div>
  )
}

export default CreatePost