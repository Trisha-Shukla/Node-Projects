import React from 'react'
import CreatePost from '../components/CreatePost'
import Tweet from '../components/Tweet'
import { useSelector } from 'react-redux'


const Feed = () => {
  const {tweets}=useSelector(state=>state.tweetData)
  return (
    <div className='w-[40%]'>
      <CreatePost/>
      {
        tweets?.map((tweet)=>
          <Tweet key={tweet?._id} tweet={tweet}/>
        )
      }
    </div>
  )
}

export default Feed