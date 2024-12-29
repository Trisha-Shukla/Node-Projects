import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import { AddProduct, Cart, Home, Layout, Login, Profile, Register,RegisterSeller, SingleProduct } from './pages'
import ProtectedRoute from './components/ProtectedRoute'
import VerifyEmail from './components/VerifyEmail'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/authSlice/authSlice'
import Wishlist from './pages/Wishlist'
import { getProduct } from './store/productSlice/productSlice'


function App() {
  const dispatch=useDispatch();
  const isAuthenticated=useSelector((state)=>state.auth.isAuthenticated)
  useEffect(() => {
    dispatch(checkAuth());
    dispatch(getProduct())
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/register-seller' element={<RegisterSeller/>}/>
          <Route path='/verify-email' element={<VerifyEmail/>}/>
          <Route path='/add-product' element={<ProtectedRoute><AddProduct/></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/product/:id' element={<ProtectedRoute><SingleProduct/></ProtectedRoute>}/>
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
          <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
          {/* <Route path='' element={<Home/>}/> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
