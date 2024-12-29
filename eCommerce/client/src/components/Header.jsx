import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/cartSlice/cartSlice';
import { logout } from '../store/authSlice/authSlice';
import { IoIosSettings } from "react-icons/io";

const Header = () => {
  const cart=useSelector((state)=>state.cart.cart)
  const user=useSelector((state)=>state.auth.user)
  console.log("Header Rendered");
  const [visible,setVisible]=useState(false)
  const dispatch=useDispatch()

  const handleSetting=()=>{
    setVisible(!visible)
  }
  let cartLength=0;
  if(cart){
     cartLength=cart.items.reduce((acc,item)=> acc+item.quantity,0)
  console.log(cartLength);
  }
  
  
  const isAuthenticated= useSelector((state)=> state.auth.isAuthenticated)
  const handleLogout=async()=>{
    dispatch(logout())
  }
  useEffect(()=>{
    dispatch(fetchCart());
  },[])
  return (
    <div className='p-4 flex justify-between bg-purple-400 text-white text-lg'>
        <Link to={'/'}>Geekster <span className='text-purple-800 text-2xl'>Ecom</span></Link>
        <div className='flex justify-between gap-6'>
            <Link to={'/contact'}>Contact Us</Link>
            {
              !isAuthenticated?(
                <Link to={'/login'}>Login</Link>
              ):
              (<div className='flex gap-4 items-center'>
                <Link to="/cart" className="relative">
                Cart{" "}
                {(cart && cartLength> 0) && (
                  <span className="absolute -top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartLength}
                  </span>
                )}
              </Link>      
              <div className='relative'>
              <IoIosSettings onClick={handleSetting}/>
                <div className=''>
                  {
                    (visible && ( <div className='flex flex-col gap-3 absolute top-3 right-4 bg-gray-100 text-purple-700'>
                      {user?.role==="seller" && (
                      <>
                      <Link to={`/my-products/${data._id}`}>My products</Link>
                      <Link to={'/add-product'}>Add Product</Link>  
                      </>)}
                      
                      
                      <Link to={'/profile'}>Profile</Link>  
                      <Link>My Orders</Link>
                      <Link to={'/wishlist'}>Wishlist</Link>

                      <button onClick={handleLogout}>Logout</button>            </div> ))
                  }
                </div>
              
                </div>        
                
              </div>
              )
            }
        </div>
    </div>
  )
}

export default Header