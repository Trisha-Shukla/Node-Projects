import React, { useEffect, useState } from 'react';
import { IoMdArrowBack } from "react-icons/io";
import { Link, useParams } from 'react-router-dom';
import Avatar from "react-avatar";
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/getProfile';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { followingUpdate } from '../store/userSlice';
import { getRefresh } from '../store/tweetSlice';


const Profile = () => {

    const { id } = useParams();
    const dispatch=useDispatch()
    useGetProfile(id)
    const {  profile,user } = useSelector(store => store.userData);




    const handleFollowing=async()=>{
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, {});
            console.log(res);
            setRefresh(!refresh)
            dispatch(followingUpdate(id))
            dispatch(getRefresh())
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }

    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>10 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar src="https://i.pravatar.cc/40" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                    {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-200 rounded-full border border-gray-400'>Edit Profile</button>

                        ) : (
                            <button onClick={handleFollowing} className='px-4 py-1 bg-black text-white rounded-full'>
                                {user?.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>
                <div className='m-4 text-sm'>
                    <p>🌐 Exploring the web's endless possibilities with MERN Stack 🚀 | Problem solver by day, coder by night 🌙 | Coffee lover ☕ | Join me on this coding journey!</p>
                </div>
            </div>
        </div>
    )
}

export default Profile