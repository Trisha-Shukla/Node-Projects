import { useState } from 'react'
import './App.css'
import axios from 'axios'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import BookForm from './component/BookForm'
import Layout from './component/Layout'
import Register from './component/Register'
import Login from './component/Login'
import VerifyEmail from './component/VerifyEmail'

function App() {
    return (<Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path='' element={<BookForm/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='login' element={<Login/>}/>
          <Route path='verify-email' element={<VerifyEmail/>}/>
        </Route>
      </Routes>
      </Router>
  )
}

export default App
