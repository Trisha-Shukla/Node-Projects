import React from 'react'
import { FaRegComment } from 'react-icons/fa'
import { CiBookmark, CiHeart } from 'react-icons/ci'
import { MdOutlineDeleteOutline } from 'react-icons/md'
import Avatar from 'react-avatar'
import axios from 'axios'
import { getRefresh } from '../store/tweetSlice'
import toast from 'react-hot-toast'
import { TWEET_API_END_POINT } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'

const Tweet = ({ tweet }) => {
  console.log(tweet);
  const {user}=useSelector(state=>state.userData)
  const dispatch = useDispatch()
  const likeOrDislikeHandler = async (id) => {
    console.log(id);

    try {
      const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, {}, {
        withCredentials: true
      })
      console.log(res);
      dispatch(getRefresh());
      toast.success(res?.data.message);

    } catch (error) {
      toast.success(error?.response?.data?.message);
      console.log(error);
    }
  }
  const deleteTweetHandler = async (id) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
        console.log(res);
        dispatch(getRefresh());
        toast.success(res.data.message);
    } catch (error) {
        toast.success(error.response.data.message);
        console.log(error);
    }
}

  return (
    <div>
      <div className='w-full'>
        <div className='flex p-4 w-full'>
          <Avatar src="https://i.pravatar.cc/40" size="40" round={true} />
          <div className='ml-2 w-full'>
            <div className='flex items-center'>
              <h1 className='font-bold'>{tweet?.userDetails[0]?.name}</h1>
              <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails[0]?.username}`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            <div className='flex justify-between my-3'>
              <div className='flex items-center'>
                <div className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                  <FaRegComment size='20px' />
                </div>

                <p>0</p>
              </div>
              <div className='flex items-center'>
                <div className='p-2 hover:bg-red-200 rounded-full cursor-pointer' onClick={() => likeOrDislikeHandler(tweet?._id)}>
                  <CiHeart size='24px' />
                </div>

                <p>{tweet?.like?.length}</p>
              </div>
              <div className='flex items-center'>
                <div className='p-2 hover:bg-blue-200 rounded-full cursor-pointer'>
                  <CiBookmark size='24px' />
                </div>

                <p>0</p>
              </div>
              {
                tweet?.userId===user?._id && (
                  <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                    <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                      <MdOutlineDeleteOutline size="24px" />
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tweet