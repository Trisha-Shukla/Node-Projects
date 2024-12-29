import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/context'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '../store/cartSlice/cartSlice';

const Header = () => {
  const cart=useSelector((state)=>state.cart.cart)
  console.log(cart);
  const dispatch=useDispatch()
  let cartLength=0;
  if(cart){
     cartLength=cart.items.reduce((acc,item)=> acc+item.quantity,0)
  console.log(cartLength);
  }
  
  
  console.log("Header Rendered");
  const isAuthenticated= useSelector((state)=> state.auth.isAuthenticated)
  const handleLogout=async()=>{
    await logout();
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
              (<>
                <Link to="/cart" className="relative">
                Cart{" "}
                {(cart && cartLength> 0) && (
                  <span className="absolute -top-2 -right-3 bg-white text-black rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartLength}
                  </span>
                )}
              </Link>              
                <Link to={'/add-product'}>Add Product</Link>                
                <Link to={'/profile'}>Profile</Link>    
                <button onClick={handleLogout}>Logout</button>            
              </>
              )
            }
        </div>
    </div>
  )
}

export default Header