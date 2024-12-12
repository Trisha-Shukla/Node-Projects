import React from 'react'
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <h1>Header</h1>
        <div className=''>
            <Link to={'/'}>Book Form</Link>
            <br />
            <Link to={'/register'}>Register</Link>
            <br />
            <Link to={'/login'}>Login</Link>
        </div>
    </div>
  )
}

export default Header