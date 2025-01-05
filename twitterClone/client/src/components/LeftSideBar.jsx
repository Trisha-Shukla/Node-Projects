import React from 'react'
import logo from '../assets/logo/x.avif'
import { MdHome } from "react-icons/md";
import { FaHashtag } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, getOtherUser, getUser } from '../store/userSlice';
import toast from 'react-hot-toast';
import { USER_API_END_POINT } from '../utils/constant';
import axios from 'axios';

const LeftSideBar = () => {
  const {user} = useSelector(store=>store.userData);
  const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`);
            dispatch(getUser(null));
            dispatch(getOtherUser(null));
            dispatch(getMyProfile(null));
            navigate('/login');
            toast.success(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className='w-[20%] hidden lg:block'>
      <div>
        {/* logo */}
        <div className='ml-5'>
          <img src={logo} alt="" style={{width:"40px"}}/>
        </div>
        {/* homepage container */}
        <div className='my-4'>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full active:scale-95 transition-all duration-200 ease-in-out'>
            <MdHome/>
            <h1 className='font-bold text-lg ml-2'>Home</h1>
          </div>
        </div>
        <div className='my-4'>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full active:scale-95 transition-all duration-200 ease-in-out'>
            <FaHashtag/>
            <h1 className='font-bold text-lg ml-2 bg'>Explore</h1>
          </div>
        </div>
        <div className='my-4'>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full active:scale-95 transition-all duration-200 ease-in-out'>
            <FaBell/>
            <h1 className='font-bold text-lg ml-2'>Notification</h1>
          </div>
        </div>
        <div className='my-4'>
          <Link to={`/profile/${user?._id}`}>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full active:scale-95 transition-all duration-200 ease-in-out'>
            <FaUser/>

            <h1 className='font-bold text-lg ml-2'>Profile</h1>
          </div>
          </Link>
        </div>
        <div className='my-4'>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full active:scale-95 transition-all duration-200 ease-in-out'>
            <FaBookmark/>
            <h1 className='font-bold text-lg ml-2'>Bookmark</h1>
          </div>
        </div>
        <div className='my-4'>
          <div className='flex items-center my-2 px-4 py-2 hover:bg-gray-200 hover:cursor-pointer rounded-full active:scale-95 transition-all duration-200 ease-in-out'onClick={logoutHandler}>
            <MdLogout/>
            <h1 className='font-bold text-lg ml-2'>Logout</h1>
          </div>
          <button className='px-4 py-2 border-none text-md bg-[#1D98F0] w-full rounded-full text-white font-bold active:scale-95 transition-all duration-200 ease-in-out'>Post</button>
        </div>
      </div>
    </div>
  )
}

export default LeftSideBar