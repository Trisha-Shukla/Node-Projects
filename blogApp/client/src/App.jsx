import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { Home, Layout, Login, ProtectedRoute, Register } from './components'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
     <Routes>
      <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}/>
      <Route path='/profile' element={<ProtectedRoute/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      </Route>
     </Routes>
    </Router>
  )
}

export default App
